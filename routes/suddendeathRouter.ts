import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/suddendeath', (_req: Request, res: Response) => {
  res.render('suddendeath');
});

export default router;