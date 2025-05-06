// src/routes/auth.ts
import express from 'express';
import { getDB } from '../db';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Registratie
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check of gebruiker al bestaat
    const existingUser = await getDB().collection('Users').findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Gebruikersnaam of email bestaat al' 
      });
    }

    // Hash wachtwoord
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Maak nieuwe gebruiker aan
    await getDB().collection('Users').insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.redirect('/login');

  } catch (error) {
    console.error('Registratie fout:', error);
    res.status(500).json({ error: 'Serverfout bij registratie' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Zoek gebruiker op email
    const user = await getDB().collection<User>('Users').findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.redirect('/login?error=Ongeldige%20inloggegevens');
    }

    // Sessie instellen
    req.session.userId = user._id.toString();
    req.session.save(err => {
      if (err) {
        console.error('Sessie opslag fout:', err);
        return res.status(500).json({ error: 'Sessie opslag mislukt' });
      }
      res.redirect('/home');
    });

  } catch (error) {
    console.error('Login fout:', error);
    res.status(500).json({ error: 'Serverfout bij inloggen' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session?.destroy((err) => {
    if (err) {
      console.error('Uitloggen mislukt:', err);
      return res.status(500).json({ message: 'Uitloggen mislukt' });
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Profiel ophalen
router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Niet geautoriseerd' });
  }

  try {
    const user = await getDB().collection<User>('Users')
      .findOne({ _id: new ObjectId(req.session.userId) });

    if (!user) {
      return res.status(404).json({ message: 'Gebruiker niet gevonden' });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });

  } catch (error) {
    console.error('Profiel ophalen fout:', error);
    res.status(500).json({ error: 'Serverfout bij ophalen profiel' });
  }
});

export default router;