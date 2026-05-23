from sqlalchemy import Column, Integer, String, JSON

from services.database import Base


class StartupWorkspace(Base):

    __tablename__ = "startup_workspaces"

    id = Column(Integer, primary_key=True, index=True)

    startup_name = Column(String)

    mode = Column(String)

    domain = Column(String)

    startup_description = Column(String)

    startup_state = Column(JSON)