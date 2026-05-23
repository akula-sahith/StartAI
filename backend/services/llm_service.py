from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    temperature=1.0, 
    max_tokens=None,
    timeout=None,
    max_retries=2,
)