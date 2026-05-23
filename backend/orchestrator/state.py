from typing import TypedDict, Dict, List


class StartupState(TypedDict):

    startup_name: str

    mode: str

    domain: str

    architecture: Dict

    finance: Dict

    marketing: Dict

    hiring: Dict

    completed_agents: List[str]