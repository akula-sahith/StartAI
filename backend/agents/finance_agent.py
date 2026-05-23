from orchestrator.state import StartupState
from services.llm_service import llm


def finance_agent(state: StartupState):

    mode = state["mode"]

    if mode == "creation":

        prompt = f"""
        You are a startup finance agent.

        Startup:
        {state['startup_name']}

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
        You are a startup optimization finance agent.

        Analyze startup financial state and suggest optimizations.

        Finance state:
        {state['finance']}
        """

    response = llm.invoke(prompt)

    state["finance"] = {
        "finance_recommendation": response.content
    }

    state["completed_agents"].append("FINANCE_AGENT")

    return state