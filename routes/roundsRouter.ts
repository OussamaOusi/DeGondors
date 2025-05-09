import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/10rounds', (_req: Request, res: Response) => {
  res.render('10rounds');
});

export default router;