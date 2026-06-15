import { ExperimentCreateInput } from '../types';

export class ExperimentService {
  async create(input: ExperimentCreateInput): Promise<{ id: string }> {
    void input;
    return { id: 'exp_' + Math.random().toString(36).slice(2) };
  }

  async findAll(): Promise<unknown[]> {
    return [];
  }

  async findById(id: string): Promise<unknown | null> {
    return { id };
  }

  async delete(id: string): Promise<void> {
    void id;
  }
}
