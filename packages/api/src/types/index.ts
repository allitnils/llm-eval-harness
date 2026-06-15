export interface ModelConfig {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'ollama' | 'custom';
  modelId: string;
  apiKey?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ScoreRequest {
  hypothesis: string;
  reference: string;
  metrics: Array<'rouge1' | 'rouge2' | 'rougeL' | 'bertscore'>;
}

export interface ScoreResult {
  rouge1?: number;
  rouge2?: number;
  rougeL?: number;
  bertscore?: number;
}

export interface RunEvent {
  type: 'progress' | 'result' | 'error' | 'complete';
  runId: string;
  data: unknown;
}

export interface ExperimentCreateInput {
  name: string;
  description?: string;
  datasetId: string;
  models: ModelConfig[];
}
