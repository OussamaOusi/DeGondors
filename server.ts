// // src/server.ts
// import express, { Request, Response } from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import indexRoutes from './routes/indexRoutes';
// import apiRoutes from './routes/apiRoutes'; // voor de /api/quote

// dotenv.config(); // Laadt variabelen uit .env bestand

// const app = express();
// const PORT = process.env.PORT || 3000;

// // 1. View engine instellen
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // 2. Static bestanden serveren
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'css')));
// app.use('/images', express.static(path.join(__dirname, 'images')));

// // 3. Body parsers (voor formulieren / JSON)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // 4. Routes koppelen
// app.use('/', indexRoutes); // Webpagina's
// app.use('/api', apiRoutes); // API-endpoints (bijv. /api/quote)

// // 6. Server starten
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
import express from "express";
import path from "path";
import session from "./public/session";
import { connect, favoriteQuotesCollection, saveScore , login, registerUser, userCollection} from "./database";
import indexRoutes from "./routes/indexRoutes";
import apiRoutes from "./routes/apiRoutes";
import loginRouter from "./routes/loginRouter";
import registrationRouter from "./routes/registrationRouter"
import homeRouter from "./routes/homeRouter";
import roundsRouter from "./routes/roundsRouter";
import blacklistRouter from "./routes/blacklistRouter";
import favoritesRouter from "./routes/favoritesRouter";
import leaderboardsRouter from "./routes/leaderboardsRouter";
import profileRouter from "./routes/profileRouter";
import { ObjectId } from "mongodb";
import suddendeathRouter from "./routes/suddendeathRouter";
import blitzRouter from "./routes/blitzRouter";
import tenRoundsRouter from "./routes/roundsRouter";
import favoriteRouter from "./routes/favoritesRouter"
import roundsLikeDislikeRouter from "./routes/roundsLikeDislikeRouter";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.set('views', path.join(__dirname, "views"));
app.use(session);


app.use("/10rounds", tenRoundsRouter);
app.use("/favorites", favoriteRouter);
app.use("/api/rounds", roundsLikeDislikeRouter);
app.use("/blacklist", blacklistRouter);
app.use( loginRouter, indexRoutes, apiRoutes, registrationRouter, homeRouter, favoriteRouter);

//session moet gefixt worden
app.post("/logout", async(req, res) => {
    console.log(">>> Voor destroy:", req.session);  
    req.session.destroy(() => {
        res.redirect("/");
    });
    console.log(">>> Na destroy, req.session is:", req.session); 
});

app.post("/api/scores", async (req, res) => {
  const userId = req.session.user?._id ;
  const {score} = req.body;
  const mode = req.body.mode; 
  if (!userId) {
    res.status(401).send("Niet ingelogd");
    return;
  }
  
  try{
    await saveScore(userId, score, mode);
    res.status(200).json({ message: "Score saved" });
  }
  catch (err) {
    res.status(500).json({ message: "Error saving score" });
  }
});
app.use( loginRouter, indexRoutes, apiRoutes, registrationRouter, homeRouter, roundsRouter, blacklistRouter, leaderboardsRouter, profileRouter, favoritesRouter, suddendeathRouter, blitzRouter);

// **Logout**-route
app.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// Start server
app.listen(app.get("port"), async () => {
  await connect();
  console.log(`Server draait op http://localhost:${app.get("port")}`);
});