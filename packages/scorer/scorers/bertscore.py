from bert_score import score as bert_score_fn

def score(hypothesis: str, reference: str) -> float:
    _, _, f1 = bert_score_fn([hypothesis], [reference], lang="en", verbose=False)
    return float(f1[0])
