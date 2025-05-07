import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/blacklist', (_req: Request, res: Response) => {
  res.render('blacklist');
});

export default router;