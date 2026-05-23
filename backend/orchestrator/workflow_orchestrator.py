from langgraph.graph import StateGraph, END

from orchestrator.state import StartupState

from agents.cto_agent import cto_agent
from agents.finance_agent import finance_agent
from agents.hiring_agent import hiring_agent
from agents.marketing_agent import marketing_agent


def build_workflow():

    workflow = StateGraph(StartupState)

    workflow.add_node("cto_agent", cto_agent)

    workflow.add_node("finance_agent", finance_agent)

    workflow.add_node("hiring_agent", hiring_agent)

    workflow.add_node("marketing_agent", marketing_agent)

    workflow.set_entry_point("cto_agent")

    workflow.add_edge("cto_agent", "finance_agent")

    workflow.add_edge("finance_agent", "hiring_agent")

    workflow.add_edge("hiring_agent", "marketing_agent")

    workflow.add_edge("marketing_agent", END)

    return workflow.compile()