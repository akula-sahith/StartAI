from fastapi import FastAPI
from pydantic import BaseModel

from services.database import engine, SessionLocal

from models.startup_models import Base, StartupWorkspace

from memory.startup_memory import (
    create_workspace,
    update_workspace_state
)

from orchestrator.workflow_orchestrator import build_workflow

Base.metadata.create_all(bind=engine)

app = FastAPI()


class WorkspaceRequest(BaseModel):

    startup_name: str
    mode: str
    domain: str
    startup_description: str


@app.get("/")
def home():

    return {
        "message": "Startup OS Backend Running"
    }


@app.post("/workspace")
def create_startup_workspace(data: WorkspaceRequest):

    db = SessionLocal()

    # Create initial workspace
    workspace = create_workspace(
        db=db,
        startup_name=data.startup_name,
        mode=data.mode,
        domain=data.domain,
        startup_description=data.startup_description
    )

    # Build LangGraph workflow
    workflow = build_workflow()

    # Shared startup state
    initial_state = {

        "startup_name": workspace.startup_name,

        "mode": workspace.mode,

        "domain": workspace.domain,

        "startup_description": workspace.startup_description,

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


@app.get("/workspace/{workspace_id}")
def get_workspace(workspace_id: int):

    db = SessionLocal()

    workspace = db.query(StartupWorkspace).filter(
        StartupWorkspace.id == workspace_id
    ).first()

    if not workspace:

        return {
            "error": "Workspace not found"
        }

    return {
        "workspace_id": workspace.id,
        "startup_name": workspace.startup_name,
        "mode": workspace.mode,
        "domain": workspace.domain,
        "startup_state": workspace.startup_state
    }