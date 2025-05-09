import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/leaderboards', (_req: Request, res: Response) => {
  res.render('leaderboards');
});

export default router;