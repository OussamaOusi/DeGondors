import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { BlacklistQuotesCollection, favoriteQuotesCollection } from '../database';

const router = express.Router();

router.post("/like", async (req: Request, res: Response) => {
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

router.post("/dislike", async (req: Request, res: Response) => {
  const userId = req.session.user?._id;
  if (!userId) {
    res.status(401).send("Niet ingelogd");
    return;
  }

  const { quote, characterId, characterName, wikiUrl, movie, reason } = req.body;
  if (!quote || !characterId || !characterName || !wikiUrl || !reason) {
    res.status(400).send("Verplichte velden ontbreken (inclusief reden)");
    return;
  }

  const entry = {
    userId: new ObjectId(userId),
    quote,
    characterId,
    characterName,
    wikiUrl,
    movie,
    reason
  };

  try {
    await BlacklistQuotesCollection.updateOne(
      { userId: entry.userId, quote },
      { $setOnInsert: entry },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error("DB-fout bij dislike:", err);
    res.status(500).send("Kon niet opslaan");
  }
});
export default router;