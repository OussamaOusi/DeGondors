
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/profile', (_req: Request, res: Response) => {
  res.render('profile');
});

export default router;