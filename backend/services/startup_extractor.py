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

    # Handle different response formats
    content = response.content

    # If content is list
    if isinstance(content, list):

        combined_text = ""

        for item in content:

            if isinstance(item, dict):

                combined_text += item.get("text", "")

            else:

                combined_text += str(item)

        content = combined_text

    cleaned = content.strip()

    # Remove markdown formatting if present
    cleaned = cleaned.replace("```json", "")
    cleaned = cleaned.replace("```", "")

    return json.loads(cleaned)