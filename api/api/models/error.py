from pydantic import BaseModel

class Error(BaseModel):
    index: int
    code: int
    text: str
