from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from core.database.database import (
    get_db,
    engine,
    Base
)

from core.schemas.user_schema import (
    UserCreate,
    UserLogin
)

from core.services.user_service import (
    create_user,
    authenticate_user
)

from core.auth.security import (
    create_access_token
)

Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(
        db,
        user
    )


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    authenticated_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas"
        )

    token = create_access_token({
        "sub": authenticated_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "name": authenticated_user.name,
            "email": authenticated_user.email,
            "role": authenticated_user.role
        }
    }