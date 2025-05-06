// src/routes/views.ts
import express from 'express';
import { requireAuth } from '../middleware/secure';

const router = express.Router();

// Homepagina
router.get('/', (req, res) => {
  res.render('index', { user: req.session.userId });
});

// Registratiepagina
router.get('/register', (req, res) => {
  res.render('registration');
});

// Loginpagina
router.get('/login', (req, res) => {
  res.render('login', { error: req.query.error });
});

// Protected routes
router.get('/home', requireAuth, (req, res) => {
  res.render('home', { user: req.session.userId });
});