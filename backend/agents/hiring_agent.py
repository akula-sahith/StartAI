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

        Your responsibility is organizational and hiring optimization.

        Identify:

        1. Missing talent areas
        2. Organizational bottlenecks
        3. Team scaling problems
        4. Leadership gaps
        5. Hiring optimization opportunities

        Return strategic hiring recommendations.
        """

    response = llm.invoke(prompt)

    state["hiring"] = {
        "hiring_recommendation": response.content
    }

    state["completed_agents"].append("HIRING_AGENT")

    return state