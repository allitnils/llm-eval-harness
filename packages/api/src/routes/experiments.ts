import { Router, Request, Response } from 'express';
import { z } from 'zod';

export const experimentsRouter = Router();

const CreateExperimentSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  datasetId: z.string().cuid(),
  models: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      provider: z.enum(['openai', 'anthropic', 'google', 'ollama', 'custom']),
      modelId: z.string(),
      apiKey: z.string().optional(),
      baseUrl: z.string().url().optional(),
      maxTokens: z.number().int().positive().optional(),
      temperature: z.number().min(0).max(2).optional(),
    })
  ).min(1),
});

experimentsRouter.get('/', async (_req: Request, res: Response) => {
  res.json({ experiments: [], total: 0 });
});

experimentsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, name: 'Demo experiment', status: 'completed' });
});

experimentsRouter.post('/', async (req: Request, res: Response) => {
  const result = CreateExperimentSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const { name, description, datasetId } = result.data;
  res.status(201).json({
    id: 'exp_' + Math.random().toString(36).slice(2),
    name,
    description,
    datasetId,
    createdAt: new Date().toISOString(),
  });
});

experimentsRouter.delete('/:id', async (req: Request, res: Response) => {
  res.json({ deleted: req.params.id });
});
