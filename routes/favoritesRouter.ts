import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { favoriteQuotesCollection } from "../database";
import { secureMiddleware } from "../secureMiddleware";

const router = Router();

router.post("/like", async (req, res) => {
  const userId = req.session.user?._id;
  if (!userId) {
    res.status(401).send("Niet ingelogd");
    return;
  }

  const { quote, characterId, characterName, wikiUrl, movie } = req.body;
  if (!quote || !characterId || !characterName) {
    res.status(400).send("Verplichte velden ontbreken");
    return;
  }

  const entry = {
    userId: new ObjectId(userId),
    quote,
    characterId,
    characterName,
    wikiUrl,
    movie,
    createdAt: new Date()
  };

  try {
    await favoriteQuotesCollection.updateOne(
      { userId: entry.userId, quote },
      { $setOnInsert: entry },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error("DB-fout bij like:", err);
    res.status(500).send("Kon niet opslaan");
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.session.user?._id;
  
  const favId = req.params.id;
  try {
    const result = await favoriteQuotesCollection.deleteOne({
      _id: new ObjectId(favId),
      userId: new ObjectId(userId)
    });
    res.json({ success: true });
  } catch (err) {
    console.error("DB-fout bij verwijderen:", err);
    res.status(500).json({ error: "Serverfout" });
  }
});

// GET /favorites?character=Naam
router.get("/", secureMiddleware, async (req, res) => {
  const userId = req.session.user!._id;
  const filter = (req.query.character as string) || null;

  // 1) haal alle favorieten op
  let favs = await favoriteQuotesCollection
    .find({ userId: new ObjectId(userId) })
    .toArray();

  // 2) optioneel filteren
  if (filter) {
    favs = favs.filter(f => f.characterName === filter);
  }

  res.render("favorites", {
    favorites: favs,
    filter, // kan null zijn
  });
});

// DELETE /favorites/:id
router.delete("/:id", secureMiddleware, async (req, res) => {
  const userId = req.session.user!._id;
  const favId = req.params.id;

  try {
    await favoriteQuotesCollection.deleteOne({
      _id: new ObjectId(favId),
      userId: new ObjectId(userId),
    });
    res.json({ success: true });
  } catch (err) {
    console.error("DB-fout bij verwijderen favorite:", err);
    res.status(500).json({ error: "Kon niet verwijderen" });
  }
});

export default router;
