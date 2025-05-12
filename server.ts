import express, { Request, Response } from "express";
import path from "path";
import session from "./public/session";
import { connect, favoriteQuotesCollection } from "./database";
import indexRoutes from "./routes/indexRoutes";
import apiRoutes from "./routes/apiRoutes";
import loginRouter from "./routes/loginRouter";
import registrationRouter from "./routes/registrationRouter";
import homeRouter from "./routes/homeRouter";
import roundsRouter from "./routes/roundsRouter";
import blacklistRouter from "./routes/blacklistRouter";
import favoritesRouter from "./routes/favoritesRouter";
import leaderboardsRouter from "./routes/leaderboardsRouter";
import profileRouter from "./routes/profileRouter";
import { ObjectId } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.set('views', path.join(__dirname, "views"));
app.use(session);

// **Eerst** externe API’s
app.use("/api", apiRoutes);

// **Dan** je eigen “favorites” API + pagina
app.post("/api/favorites/like", async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user?._id;
  if (!userId) {
    res.status(401).send("Niet ingelogd");
    return;
  }

  const { quote, characterId, characterName, wikiUrl, movie } = req.body;
  if (!quote || !characterId || !characterName || !wikiUrl) {
    res.status(400).send("Verplichte velden ontbreken");
    return;
  }

  try {
    await favoriteQuotesCollection.updateOne(
      { userId: new ObjectId(userId), quote },
      {
        $setOnInsert: {
          userId: new ObjectId(userId),
          quote,
          characterId,
          characterName,
          wikiUrl,
          movie,
          createdAt: new Date(),
        }
      },
      { upsert: true }
    );
    res.status(200).json({ success: true });  // **GEEN** `return` hier
  } catch (err) {
    console.error("DB-fout bij like:", err);
    res.status(500).send("Kon niet opslaan");  // **GEEN** `return` hier
  }
});

app.use( loginRouter, indexRoutes, apiRoutes, registrationRouter, homeRouter, roundsRouter, blacklistRouter, leaderboardsRouter, profileRouter);

// **Logout**-route
app.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// Start server
app.listen(PORT, async () => {
  await connect();
  console.log(`Server draait op http://localhost:${PORT}`);
});