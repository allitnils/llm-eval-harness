import { ModelConfig } from '../types';

export interface RunJob {
  runId: string;
  experimentId: string;
  model: ModelConfig;
  datasetId: string;
}

export class RunnerService {
  async enqueue(job: RunJob): Promise<void> {
    console.log(`Enqueuing run ${job.runId} for model ${job.model.id}`);
  }

  async cancel(runId: string): Promise<void> {
    console.log(`Cancelling run ${runId}`);
  }

  async getStatus(runId: string): Promise<string> {
    void runId;
    return 'pending';
  }
}
