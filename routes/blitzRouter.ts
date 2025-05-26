import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/blitz', (_req: Request, res: Response) => {
  res.render('blitz');
});

export default router;