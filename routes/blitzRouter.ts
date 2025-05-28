import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/blitz', (req: Request, res: Response) => {
  res.render('blitz', { 
    user: req.session.user,
    currentPath: '/home'
  });
});

export default router;