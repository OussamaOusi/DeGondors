// src/server.ts
import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import indexRoutes from './routes/indexRoutes';
import apiRoutes from './routes/apiRoutes'; // voor de /api/quote

dotenv.config(); // Laadt variabelen uit .env bestand

const app = express();
const PORT = process.env.PORT || 3000;

// 1. View engine instellen
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Static bestanden serveren
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// 3. Body parsers (voor formulieren / JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Routes koppelen
app.use('/', indexRoutes); // Webpagina's
app.use('/api', apiRoutes); // API-endpoints (bijv. /api/quote)

// 5. Fallback voor onbekende pagina's (optioneel)
app.use((_req: Request, res: Response) => {
  res.status(404).render('404'); // Zorg dat je een 404.ejs maakt
});

// 6. Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});