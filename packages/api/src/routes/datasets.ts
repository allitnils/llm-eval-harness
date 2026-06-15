import { Router, Request, Response } from 'express';
import { z } from 'zod';

export const datasetsRouter = Router();

const DatasetItemSchema = z.object({
  input: z.string().min(1),
  expected: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

const CreateDatasetSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  items: z.array(DatasetItemSchema).min(1),
});

datasetsRouter.get('/', async (_req: Request, res: Response) => {
  res.json({ datasets: [], total: 0 });
});

datasetsRouter.get('/:id', async (req: Request, res: Response) => {
  res.json({ id: req.params.id, name: 'Demo dataset', items: [] });
});

datasetsRouter.post('/', async (req: Request, res: Response) => {
  const result = CreateDatasetSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const { name, description, items } = result.data;
  res.status(201).json({
    id: 'ds_' + Math.random().toString(36).slice(2),
    name,
    description,
    itemCount: items.length,
    createdAt: new Date().toISOString(),
  });
});
