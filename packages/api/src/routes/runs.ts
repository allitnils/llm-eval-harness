import { Router, Request, Response } from 'express';

export const runsRouter = Router();

runsRouter.get('/', async (_req: Request, res: Response) => {
  res.json({ runs: [], total: 0 });
});

runsRouter.get('/:id', async (req: Request, res: Response) => {
  res.json({ id: req.params.id, status: 'completed', results: [] });
});

runsRouter.get('/:id/stream', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: 'heartbeat', runId: req.params.id })}\n\n`);
  }, 15000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

runsRouter.post('/:id/cancel', async (req: Request, res: Response) => {
  res.json({ id: req.params.id, status: 'cancelled' });
});
