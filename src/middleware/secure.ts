import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session?.userId) {
    res.status(401).json({ message: 'Niet geautoriseerd' });
    return;
  }
  next();
};