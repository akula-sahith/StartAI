from orchestrator.state import StartupState
from services.llm_service import llm


def cto_agent(state: StartupState):

    mode = state["mode"]

    if mode == "creation":

        prompt = f"""
        You are a CTO agent.

        A founder wants to build:
        {state['startup_name']}

        Startup Description:
        {state['startup_description']}

        Domain:
        {state['domain']}

        Suggest:
        - backend architecture
        - frontend stack
        - database
        - deployment approach
        """

    else:

        prompt = f"""
        You are a CTO optimization agent.

        Analyze startup architecture and suggest improvements.

        Current architecture:
        {state['architecture']}
        """

    response = llm.invoke(prompt)

    state["architecture"] = {
        "cto_recommendation": response.content
    }

    state["completed_agents"].append("CTO_AGENT")

    return state