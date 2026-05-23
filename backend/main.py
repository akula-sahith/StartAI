from fastapi import FastAPI
from pydantic import BaseModel

from services.database import engine, SessionLocal
from models.startup_models import Base
from memory.startup_memory import create_workspace
from orchestrator.workflow_orchestrator import build_workflow
Base.metadata.create_all(bind=engine)

app = FastAPI()


class WorkspaceRequest(BaseModel):

    startup_name: str
    mode: str
    domain: str


@app.get("/")
def home():

    return {
        "message": "Startup OS Backend Running"
    }


@app.post("/workspace")
def create_startup_workspace(data: WorkspaceRequest):

    db = SessionLocal()

    workspace = create_workspace(
        db=db,
        startup_name=data.startup_name,
        mode=data.mode,
        domain=data.domain
    )

    workflow = build_workflow()
    initial_state = {
    "startup_name": workspace.startup_name,
    "mode": workspace.mode,
    "domain": workspace.domain,

    "architecture": {},
    "finance": {},
    "marketing": {},
    "hiring": {},

    "completed_agents": []
    }

    final_state = workflow.invoke(initial_state)


    return {
    "workspace_id": workspace.id,
    "final_state": final_state
    }