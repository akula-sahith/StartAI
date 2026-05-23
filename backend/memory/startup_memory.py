from sqlalchemy.orm import Session

from models.startup_models import StartupWorkspace


def create_workspace(
    db: Session,
    startup_name: str,
    mode: str,
    domain: str
):

    workspace = StartupWorkspace(
        startup_name=startup_name,
        mode=mode,
        domain=domain,
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