
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/favorites', (_req: Request, res: Response) => {
  res.render('favorites');
});

export default router;