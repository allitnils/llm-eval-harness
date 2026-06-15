export interface Experiment {
  id: string;
  name: string;
  description?: string;
  datasetId: string;
  createdAt: string;
  runs?: Run[];
}

export interface Dataset {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  createdAt: string;
}

export interface Run {
  id: string;
  experimentId: string;
  modelId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt?: string;
  completedAt?: string;
}

export interface Result {
  id: string;
  runId: string;
  itemId: string;
  output: string;
  scores?: {
    rouge1?: number;
    rouge2?: number;
    rougeL?: number;
    bertscore?: number;
  };
  latencyMs?: number;
}

export interface ModelProvider {
  provider: string;
  models: string[];
}
