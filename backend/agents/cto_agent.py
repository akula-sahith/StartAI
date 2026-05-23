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

        Analyze the COMPLETE startup organizational state.

        Startup:
        {state['startup_name']}

        Description:
        {state['startup_description']}

        Current Architecture:
        {state['architecture']}

        Finance State:
        {state['finance']}

        Hiring State:
        {state['hiring']}

        Marketing State:
        {state['marketing']}

        Your responsibility is technical optimization.

        Identify:

        1. Technical bottlenecks
        2. Scaling issues
        3. Infrastructure inefficiencies
        4. Architecture improvements
        5. Technical risks

        Return strategic recommendations.
        """

    response = llm.invoke(prompt)

    state["architecture"] = {
        "cto_recommendation": response.content
    }

    state["completed_agents"].append("CTO_AGENT")

    return state