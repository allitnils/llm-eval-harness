import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.headers['x-api-key'];
  const configuredKey = process.env.API_KEY;

  if (configuredKey && apiKey !== configuredKey) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
