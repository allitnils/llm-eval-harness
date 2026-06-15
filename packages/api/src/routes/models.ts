import { Router, Request, Response } from 'express';

export const modelsRouter = Router();

const SUPPORTED_PROVIDERS = [
  { provider: 'openai', models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
  { provider: 'anthropic', models: ['claude-sonnet-4-6', 'claude-haiku-4-5-20251001'] },
  { provider: 'google', models: ['gemini-1.5-pro', 'gemini-1.5-flash'] },
  { provider: 'ollama', models: ['llama3', 'mistral', 'phi3', 'gemma2'] },
];

modelsRouter.get('/', (_req: Request, res: Response) => {
  res.json({ providers: SUPPORTED_PROVIDERS });
});

modelsRouter.post('/test', async (req: Request, res: Response) => {
  const { provider, modelId } = req.body as { provider: string; modelId: string };
  if (!provider || !modelId) {
    res.status(400).json({ error: 'provider and modelId are required' });
    return;
  }
  res.json({ ok: true, provider, modelId, latencyMs: 120 });
});
