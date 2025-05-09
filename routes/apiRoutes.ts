// src/routes/apiRoutes.ts
import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();
const API_KEY = process.env.API_KEY || 'RGcOPi2oQ79fO1Ai2PGE';

router.get('/quote', async (_req, res) => {
  try {
    const response = await fetch('https://the-one-api.dev/v2/quote', {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    const data = await response.json();
    const randomQuote = data.docs[Math.floor(Math.random() * data.docs.length)].dialog;
    res.json({ quote: randomQuote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

export default router;