
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('profile');
});

export default router;