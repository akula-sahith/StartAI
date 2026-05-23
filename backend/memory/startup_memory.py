from sqlalchemy.orm import Session

from models.startup_models import StartupWorkspace


def create_workspace(
    db: Session,
    startup_name: str,
    mode: str,
    domain: str,
    startup_description: str
):

    workspace = StartupWorkspace(
        startup_name=startup_name,
        mode=mode,
        domain=domain,
        startup_description=startup_description,
        startup_state={
            "architecture": {},
            "finance": {},
            "marketing": {},
            "hiring": {}
        }
    )

    db.add(workspace)

    db.commit()

    db.refresh(workspace)

    return workspace

def update_workspace_state(
    db,
    workspace_id,
    updated_state
):

    workspace = db.query(StartupWorkspace).filter(
        StartupWorkspace.id == workspace_id
    ).first()

    workspace.startup_state = updated_state

    db.commit()

    db.refresh(workspace)

    return workspace