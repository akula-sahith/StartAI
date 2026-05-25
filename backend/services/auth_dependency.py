from fastapi import Header, HTTPException
from services.firebase_service import verify_firebase_token


async def get_current_user(
    authorization: str = Header(...)
) -> dict:
    """
    FastAPI dependency that extracts and verifies the Firebase token
    from the Authorization header.
    
    Usage:
        @app.get("/protected")
        def protected_route(current_user: dict = Depends(get_current_user)):
            ...
    
    Returns:
        dict with uid, email, name of the authenticated user
        
    Raises:
        HTTPException(401) if token is missing, malformed, or invalid
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header format. Expected 'Bearer <token>'."
        )

    token = authorization.split("Bearer ")[1].strip()

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Authentication token is missing."
        )

    return verify_firebase_token(token)
