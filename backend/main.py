from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel

import shutil

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

Base.metadata.create_all(bind=engine)

app = FastAPI()


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
        "message": "Startup OS Backend Running"
    }


# =========================
# CREATE STARTUP WORKSPACE
# =========================

@app.post("/workspace")
def create_startup_workspace(data: WorkspaceRequest):

    db = SessionLocal()

    # Create workspace
    workspace = create_workspace(
        db=db,
        startup_name=data.startup_name,
        mode=data.mode,
        domain=data.domain,
        startup_description=data.startup_description
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


# =========================
# GET WORKSPACE
# =========================

@app.get("/workspace/{workspace_id}")
def get_workspace(workspace_id: int):

    db = SessionLocal()

    workspace = db.query(
        StartupWorkspace
    ).filter(
        StartupWorkspace.id == workspace_id
    ).first()

    if not workspace:

        return {
            "error": "Workspace not found"
        }

    return {

        "workspace_id": workspace.id,

        "startup_name": workspace.startup_name,

        "startup_description":
        workspace.startup_description,

        "mode": workspace.mode,

        "domain": workspace.domain,

        "startup_state": workspace.startup_state
    }


# =========================
# PDF STARTUP INGESTION
# =========================

@app.post("/upload-startup-pdf")
async def upload_startup_pdf(
    file: UploadFile = File(...)
):

    # Save uploaded PDF
    file_path = f"uploads/{file.filename}"

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

    return {

        "extracted_startup_data": startup_data
    }