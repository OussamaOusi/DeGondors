import { Router, Request, Response } from 'express';

const router = Router();

router.get('/home', (req, res) => {
  res.render('home');
});

export default router;