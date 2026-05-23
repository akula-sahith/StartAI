from orchestrator.state import StartupState
from services.llm_service import llm


def hiring_agent(state: StartupState):

    mode = state["mode"]

    if mode == "creation":

        prompt = f"""
        You are a startup hiring strategist.

        Startup:
        {state['startup_name']}

        Architecture:
        {state['architecture']}

        Finance:
        {state['finance']}

        Startup Description:
        {state['startup_description']}

        Suggest:

        1. Initial hiring roadmap
        2. Important technical hires
        3. Team structure
        4. Hiring priorities
        5. Scaling strategy
        """

    else:

        prompt = f"""
        You are a startup organizational optimization strategist.

        Analyze the startup and suggest:

        1. Missing talent areas
        2. Team scaling recommendations
        3. Organizational bottlenecks
        4. Hiring optimization opportunities
        5. Leadership structure improvements

        Current Hiring State:
        {state['hiring']}
        """

    response = llm.invoke(prompt)

    state["hiring"] = {
        "hiring_recommendation": response.content
    }

    state["completed_agents"].append("HIRING_AGENT")

    return state