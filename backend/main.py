from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, Form
from pydantic import BaseModel
from typing import Optional

import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from services.database import engine, SessionLocal

from models.startup_models import Base, StartupWorkspace

from memory.startup_memory import (
    create_workspace,
    update_workspace_state
)

from orchestrator.workflow_orchestrator import build_workflow

from services.pdf_service import extract_text_from_pdf

from services.startup_extractor import (
    extract_startup_information
)

from services.auth_dependency import get_current_user

from sqlalchemy import inspect, text

Base.metadata.create_all(bind=engine)

# Migrate: add new columns if they don't exist on an older table
def _run_migrations():
    inspector = inspect(engine)
    if "startup_workspaces" in inspector.get_table_names():
        existing_cols = {c["name"] for c in inspector.get_columns("startup_workspaces")}
        migrations = {
            "user_uid": "VARCHAR",
            "user_email": "VARCHAR",
            "user_name": "VARCHAR",
            "created_at": "TIMESTAMP",
        }
        with engine.begin() as conn:
            for col_name, col_type in migrations.items():
                if col_name not in existing_cols:
                    conn.execute(text(
                        f'ALTER TABLE startup_workspaces ADD COLUMN {col_name} {col_type}'
                    ))
                    print(f"[migration] Added column: {col_name}")

_run_migrations()

app = FastAPI()

#Add Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# REQUEST MODELS
# =========================

class WorkspaceRequest(BaseModel):

    startup_name: str

    mode: str

    domain: str

    startup_description: str


# =========================
# ROOT API
# =========================

@app.get("/")
def home():

    return {
        "message": "Start AI Backend Running"
    }


# =========================
# AUTHENTICATED USER INFO
# =========================

@app.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Return authenticated user info from token."""
    return {
        "uid": current_user["uid"],
        "email": current_user["email"],
        "name": current_user["name"],
    }


# =========================
# CREATE STARTUP WORKSPACE
# =========================

@app.post("/workspace")
def create_startup_workspace(
    data: WorkspaceRequest,
    current_user: dict = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        # Create workspace linked to authenticated user
        workspace = create_workspace(
            db=db,
            startup_name=data.startup_name,
            mode=data.mode,
            domain=data.domain,
            startup_description=data.startup_description,
            user_uid=current_user["uid"],
            user_email=current_user["email"],
            user_name=current_user["name"],
        )

        # Build LangGraph workflow
        workflow = build_workflow()

        # Shared organizational state
        initial_state = {

            "startup_name": workspace.startup_name,

            "startup_description":
            workspace.startup_description,

            "mode": workspace.mode,

            "domain": workspace.domain,

            "architecture": {},

            "finance": {},

            "marketing": {},

            "hiring": {},

            "completed_agents": []
        }

        # Execute orchestrated workflow
        final_state = workflow.invoke(initial_state)

        # Persist updated organizational memory
        update_workspace_state(
            db=db,
            workspace_id=workspace.id,
            updated_state=final_state
        )

        return {

            "workspace_id": workspace.id,

            "final_state": final_state
        }

    finally:
        db.close()


# =========================
# GET WORKSPACE (PROTECTED)
# =========================

@app.get("/workspace/{workspace_id}")
def get_workspace(
    workspace_id: int,
    current_user: dict = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        workspace = db.query(
            StartupWorkspace
        ).filter(
            StartupWorkspace.id == workspace_id
        ).first()

        if not workspace:

            raise HTTPException(
                status_code=404,
                detail="Workspace not found"
            )

        # Validate ownership
        if workspace.user_uid and workspace.user_uid != current_user["uid"]:
            raise HTTPException(
                status_code=403,
                detail="You do not have access to this workspace."
            )

        return {

            "workspace_id": workspace.id,

            "startup_name": workspace.startup_name,

            "startup_description":
            workspace.startup_description,

            "mode": workspace.mode,

            "domain": workspace.domain,

            "startup_state": workspace.startup_state,

            "user_uid": workspace.user_uid,

            "user_email": workspace.user_email,

            "user_name": workspace.user_name,

            "created_at": str(workspace.created_at) if workspace.created_at else None,
        }

    finally:
        db.close()


# =========================
# GET MY WORKSPACES
# =========================

@app.get("/my-workspaces")
def get_my_workspaces(
    current_user: dict = Depends(get_current_user)
):
    """Return all startup workspaces belonging to the authenticated user."""

    db = SessionLocal()

    try:
        workspaces = db.query(
            StartupWorkspace
        ).filter(
            StartupWorkspace.user_uid == current_user["uid"]
        ).order_by(
            StartupWorkspace.created_at.desc()
        ).all()

        return {
            "workspaces": [
                {
                    "workspace_id": ws.id,
                    "startup_name": ws.startup_name,
                    "domain": ws.domain,
                    "mode": ws.mode,
                    "startup_description": ws.startup_description,
                    "startup_state": ws.startup_state,
                    "created_at": str(ws.created_at) if ws.created_at else None,
                }
                for ws in workspaces
            ]
        }

    finally:
        db.close()


# =========================
# PDF STARTUP INGESTION
# =========================

@app.post("/upload-startup-pdf")
async def upload_startup_pdf(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):

    # Save uploaded PDF
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = f"{upload_dir}/{file.filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(
        file_path
    )
    # AI extraction pipeline
    startup_data = extract_startup_information(
        extracted_text
    )

    db = SessionLocal()

    try:
        # Create optimization workspace linked to authenticated user
        workspace = create_workspace(
            db=db,
            startup_name=startup_data["startup_name"],
            mode="optimization",
            domain=startup_data["domain"],
            startup_description=startup_data[
                "startup_description"
            ],
            user_uid=current_user["uid"],
            user_email=current_user["email"],
            user_name=current_user["name"],
        )

        # Build workflow
        workflow = build_workflow()

        # Organizational shared state
        initial_state = {

            "startup_name":
            startup_data["startup_name"],

            "startup_description":
            startup_data["startup_description"],

            "mode": "optimization",

            "domain":
            startup_data["domain"],

            "architecture": {

                "current_architecture":
                startup_data["current_architecture"],

                "current_problems":
                startup_data["current_problems"]
            },

            "finance": {

                "monthly_cloud_cost":
                startup_data["monthly_cloud_cost"],

                "monthly_burn":
                startup_data["monthly_burn"]
            },

            "hiring": {

                "team_size":
                startup_data["team_size"]
            },

            "marketing": {},

            "completed_agents": []
        }

        # Execute orchestrated analysis
        final_state = workflow.invoke(initial_state)

        # Persist organizational memory
        update_workspace_state(
            db=db,
            workspace_id=workspace.id,
            updated_state=final_state
        )

        return {

            "workspace_id": workspace.id,

            "extracted_data": startup_data,

            "organizational_analysis":
            final_state
        }

    finally:
        db.close()