import json

from services.llm_service import llm


def extract_startup_information(document_text: str):

    prompt = f"""
    You are an AI startup intelligence extraction system.

    Analyze the startup document below and extract:

    1. startup_name
    2. startup_description
    3. domain
    4. current_architecture
    5. team_size
    6. monthly_cloud_cost
    7. monthly_burn
    8. current_problems

    Return ONLY valid JSON.

    Startup Document:
    {document_text}
    """

    response = llm.invoke(prompt)

    cleaned = response.content.strip()

    return json.loads(cleaned)