import { Router } from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"; // voeg bovenaan toe als nog niet gebeurd
import { BlacklistQuotesCollection, favoriteQuotesCollection, scoreCollection, userCollection } from "../database";
import { SessionData } from "express-session";

const router = Router();

router.post("/profile/update", async (req, res) => {
  const { email, password } = req.body;
 const userId = req.session.user?._id;

  const updateFields = { email, password};
  if (password && password.length > 0) {
    updateFields.password = await bcrypt.hash(password, 10);
  }

  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: updateFields }
  );

  res.redirect("/profile");
});

router.get("/profile", async (req, res) => {
    console.log("➡️ /profile route triggered");
  try {
    const user = req.session.user;
    if (!user) return res.redirect("/login");

    const userId = user._id;

    const scores = await scoreCollection.find({ userId }).toArray();

    const best10Rounds = scores.filter(s => s.mode === "10rounds").sort((a, b) => b.score - a.score)[0]?.score ?? 0;
    const bestBlitz = scores.filter(s => s.mode === "blitz").sort((a, b) => b.score - a.score)[0]?.score ?? 0;
    const bestSudden = scores.filter(s => s.mode === "suddendeath").sort((a, b) => b.score - a.score)[0]?.score ?? 0;

    const favoriteCount = await favoriteQuotesCollection.countDocuments({ userId });
    const blacklistCount = await BlacklistQuotesCollection.countDocuments({ userId });

    console.log("🎯 Profielgegevens geladen", {
      best10Rounds,
      bestBlitz,
      bestSudden,
      favoriteCount,
      blacklistCount
    });

    res.render("profile", {
      user,
      best10Rounds,
      bestBlitz,
      bestSudden,
      favoriteCount,
      blacklistCount
    });
  } catch (error) {
    console.error("❌ Fout in /profile route:", error);
    res.status(500).send("Er ging iets fout bij het laden van je profiel.");
  }
});

export default router;