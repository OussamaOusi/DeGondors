import { Router, Request, Response } from 'express';
import { secureMiddleware } from '../secureMiddleware';

const router = Router();

router.get('/home', secureMiddleware, async (_req: Request, res: Response) => {
  res.render('home', {user: _req.session.user});
});

export default router;