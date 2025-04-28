// src/routes/indexRoutes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Homepagina
router.get('/', (_req: Request, res: Response) => {
  res.render('index');
});

// Loginpagina
router.get('/login', (_req: Request, res: Response) => {
  res.render('login');
});

// Registratiepagina
router.get('/registration', (_req: Request, res: Response) => {
  res.render('registration');
});

// Favorietenpagina
router.get('/favorites', (_req: Request, res: Response) => {
  res.render('favorites');
});

// Blacklistpagina
router.get('/blacklist', (_req: Request, res: Response) => {
  res.render('blacklist');
});

// 10 Rounds spelpagina
router.get('/10rounds', (_req: Request, res: Response) => {
  res.render('10rounds');
});

// Blitz spelpagina
router.get('/blitz', (_req: Request, res: Response) => {
  res.render('blitz');
});

// Leaderboards
router.get('/leaderboards', (_req: Request, res: Response) => {
  res.render('leaderboards');
});

// Sudden Death spelpagina
router.get('/suddendeath', (_req: Request, res: Response) => {
  res.render('suddendeath');
});

// Homepagina voor ingelogde gebruikers (optioneel apart)
router.get('/home', (_req: Request, res: Response) => {
  res.render('home');
});

export default router;