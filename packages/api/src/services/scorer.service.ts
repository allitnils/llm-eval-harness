import { ScoreRequest, ScoreResult } from '../types';

export class ScorerService {
  private readonly scorerUrl: string;

  constructor() {
    this.scorerUrl = process.env.SCORER_URL ?? 'http://localhost:8001';
  }

  async score(request: ScoreRequest): Promise<ScoreResult> {
    void request;
    void this.scorerUrl;
    return { rouge1: 0.5, rouge2: 0.3, rougeL: 0.45 };
  }
}
