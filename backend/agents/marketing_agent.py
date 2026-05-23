from orchestrator.state import StartupState
from services.llm_service import llm


def marketing_agent(state: StartupState):

    mode = state["mode"]

    if mode == "creation":

        prompt = f"""
        You are a startup marketing strategist.

        Startup:
        {state['startup_name']}

        Domain:
        {state['domain']}

        Architecture:
        {state['architecture']}

        Startup Description:
        {state['startup_description']}

        Hiring Plan:
        {state['hiring']}

        Create:

        1. Go-to-market strategy
        2. Customer acquisition strategy
        3. Launch roadmap
        4. Branding suggestions
        5. Growth channels
        """

    else:

        prompt = f"""
        You are a startup growth optimization strategist.

        Analyze the startup and suggest:

        1. Marketing improvements
        2. Growth bottlenecks
        3. User acquisition optimization
        4. Brand positioning improvements
        5. Revenue growth opportunities

        Current Marketing State:
        {state['marketing']}
        """

    response = llm.invoke(prompt)

    state["marketing"] = {
        "marketing_recommendation": response.content
    }

    state["completed_agents"].append("MARKETING_AGENT")

    return state