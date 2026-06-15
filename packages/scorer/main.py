from fastapi import FastAPI
from routers import score

app = FastAPI(title="LLM Eval Scorer", version="1.0.0")
app.include_router(score.router, prefix="/score")

@app.get("/health")
def health():
    return {"status": "ok"}
