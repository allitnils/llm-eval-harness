import express from 'express';
import cors from 'cors';
import { experimentsRouter } from './routes/experiments';
import { datasetsRouter } from './routes/datasets';
import { runsRouter } from './routes/runs';
import { modelsRouter } from './routes/models';
import { errorMiddleware } from './middleware/error';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/experiments', experimentsRouter);
  app.use('/api/datasets', datasetsRouter);
  app.use('/api/runs', runsRouter);
  app.use('/api/models', modelsRouter);

  app.use(errorMiddleware);

  return app;
}
