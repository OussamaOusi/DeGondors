import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/suddendeath', (req: Request, res: Response) => {
  res.render('suddendeath', { user: req.session.user });
});

export default router;