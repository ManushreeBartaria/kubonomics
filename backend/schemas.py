from pydantic import BaseModel
from typing import Dict, Any


class CustomQueryRequest(BaseModel):
    query: str


class QueryResult(BaseModel):
    query: str
    result: Dict[str, Any]


class AllQueriesResponse(BaseModel):
    results: Dict[str, Any]