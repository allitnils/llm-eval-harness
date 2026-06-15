from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal, Optional
from scorers import rouge, bertscore

router = APIRouter()

class ScoreRequest(BaseModel):
    hypothesis: str
    reference: str
    metrics: list[Literal["rouge1", "rouge2", "rougeL", "bertscore"]]

class ScoreResponse(BaseModel):
    rouge1: Optional[float] = None
    rouge2: Optional[float] = None
    rougeL: Optional[float] = None
    bertscore: Optional[float] = None

@router.post("/", response_model=ScoreResponse)
def score_text(req: ScoreRequest):
    if not req.hypothesis or not req.reference:
        raise HTTPException(status_code=400, detail="hypothesis and reference are required")
    
    result = ScoreResponse()
    
    if any(m in req.metrics for m in ["rouge1", "rouge2", "rougeL"]):
        scores = rouge.score(req.hypothesis, req.reference)
        if "rouge1" in req.metrics:
            result.rouge1 = scores["rouge1"]
        if "rouge2" in req.metrics:
            result.rouge2 = scores["rouge2"]
        if "rougeL" in req.metrics:
            result.rougeL = scores["rougeL"]
    
    if "bertscore" in req.metrics:
        result.bertscore = bertscore.score(req.hypothesis, req.reference)
    
    return result
