from orchestrator.state import StartupState
from services.llm_service import llm


def finance_agent(state: StartupState):

    mode = state["mode"]

    if mode == "creation":

        prompt = f"""
        You are a startup finance agent.

        Startup:
        {state['startup_name']}

        Startup Description:
        {state['startup_description']}

        Architecture:
        {state['architecture']}

        Estimate:
        - MVP cost
        - infrastructure cost
        - hiring budget
        - runway estimation
        """

    else:

        prompt = f"""
        You are a startup finance optimization agent.

        Analyze the COMPLETE startup organizational state.

        Startup:
        {state['startup_name']}

        Description:
        {state['startup_description']}

        Architecture State:
        {state['architecture']}

        Finance State:
        {state['finance']}

        Hiring State:
        {state['hiring']}

        Marketing State:
        {state['marketing']}

        Your responsibility is financial optimization.

        Identify:

        1. Burn rate issues
        2. Infrastructure cost inefficiencies
        3. Hiring cost concerns
        4. Budget optimization opportunities
        5. Financial scaling risks

        Return strategic financial recommendations.
        """

    response = llm.invoke(prompt)

    state["finance"] = {
        "finance_recommendation": response.content
    }

    state["completed_agents"].append("FINANCE_AGENT")

    return state