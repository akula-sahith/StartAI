import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException
import os

# Initialize Firebase Admin SDK
# Use serviceAccount.json from the backend root directory
SERVICE_ACCOUNT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "serviceAccount.json"
)

cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred)


def verify_firebase_token(token: str) -> dict:
    """
    Verify a Firebase JWT token and extract user information.
    
    Args:
        token: Firebase ID token string
        
    Returns:
        dict with uid, email, name from the verified token
        
    Raises:
        HTTPException(401) if token is invalid or expired
    """
    try:
        decoded_token = auth.verify_id_token(token)
        
        return {
            "uid": decoded_token.get("uid"),
            "email": decoded_token.get("email", ""),
            "name": decoded_token.get("name", ""),
        }
    
    except auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired. Please sign in again."
        )
    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token."
        )
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Authentication failed: {str(e)}"
        )
