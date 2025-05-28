import { Router } from "express";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import {
  BlacklistQuotesCollection,
  favoriteQuotesCollection,
  scoreCollection,
  userCollection,
} from "../database";
import { User } from "../types";

const router = Router();

declare module "express-session" {
  export interface SessionData {
    user?: User
  }
}

// ✅ ROUTE: Bewerk profielgegevens (form met username, email, wachtwoord & avatar)
router.post("/profile/update", async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const userId = req.session.user?._id;

  if (!userId) return res.redirect("/login");

  const updateFields: any = { username, email };
  if (avatar) updateFields.avatar = avatar;

  if (password && password.length > 0) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashedPassword;
  }

  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: updateFields }
  );

  const updatedUser = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (updatedUser) req.session.user = updatedUser;

  res.redirect("/profile");
});

// ✅ ROUTE: Zet profielfoto (enkel de avatar input, bijv. via “Zet als profielfoto”-knop)
router.post("/profile/avatar", async (req, res) => {
  const { avatar, characterName } = req.body;
  const userId = req.session.user?._id;

  if (!userId) return res.redirect("/login");

  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { avatar, characterName } }
  );

  // Optioneel: werk de sessie bij
  const updatedUser = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (updatedUser) req.session.user = updatedUser;

  res.redirect("/profile");
});

// ✅ ROUTE: Profielpagina tonen
router.get("/profile", async (req, res) => {
  console.log("➡️ /profile route triggered");
  try {
    const user = req.session.user;
    if (!user) return res.redirect("/login");

    const userId = user._id;

    const scores = await scoreCollection.find({ userId }).toArray();

    const best10Rounds = scores
      .filter((s) => s.mode === "10rounds")
      .sort((a, b) => b.score - a.score)[0]?.score ?? 0;
    const bestBlitz = scores
      .filter((s) => s.mode === "blitz")
      .sort((a, b) => b.score - a.score)[0]?.score ?? 0;
    const bestSudden = scores
      .filter((s) => s.mode === "suddendeath")
      .sort((a, b) => b.score - a.score)[0]?.score ?? 0;

    const favoriteCount = await favoriteQuotesCollection.countDocuments({
      userId,
    });
    const blacklistCount = await BlacklistQuotesCollection.countDocuments({
      userId,
    });

    console.log("🎯 Profielgegevens geladen", {
      best10Rounds,
      bestBlitz,
      bestSudden,
      favoriteCount,
      blacklistCount,
    });

    res.render("profile", {
      user,
      editMode: req.query.edit === "true",
      best10Rounds,
      bestBlitz,
      bestSudden,
      favoriteCount,
      blacklistCount,
    });
  } catch (error) {
    console.error("❌ Fout in /profile route:", error);
    res.status(500).send("Er ging iets fout bij het laden van je profiel.");
  }
});

router.post("/profile/delete", async (req, res) => {
  const userId = req.session.user?._id;
  if (!userId) return res.redirect("/login");

  try {
    await userCollection.deleteOne({ _id: new ObjectId(userId) });

    // Sessie leegmaken
    req.session.destroy((err) => {
      if (err) {
        console.error("❌ Fout bij sessie opruimen:", err);
        return res.status(500).send("Er ging iets fout bij het uitloggen.");
      }
      res.redirect("/"); // ✅ Redirect na verwijderen
    });
  } catch (error) {
    console.error("❌ Fout bij account verwijderen:", error);
    res.status(500).send("Er ging iets mis bij het verwijderen van je account.");
  }
});


export default router;