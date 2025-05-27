import express, { Request, Response } from 'express';
import { scoreCollection } from '../database';

const router = express.Router();

router.get('/leaderboards', async (req, res) => {
  console.log("Fetching leaderboard for all modes");
  // Fetch all scores, join with user info
  const scores = await scoreCollection.aggregate([
    { $sort: { score: -1, date: 1 } },
    {
      $lookup: {
        from: "Users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" }
  ]).toArray();

  // Group scores by mode
  const grouped: { [mode: string]: any[] } = {};
  for (const entry of scores) {
    const mode = entry.mode || 'unknown';
    if (!grouped[mode]) grouped[mode] = [];
    grouped[mode].push(entry);
  }
  // For each mode, sort and take top 5
  const highscores: { [mode: string]: any[] } = {};
  Object.keys(grouped).forEach((mode: string) => {
    highscores[mode] = grouped[mode]
      .sort((a: any, b: any) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .slice(0, 5)
      .map((entry: any, index: number) => ({
        position: index + 1,
        username: entry.user.email,
        score: entry.score,
        mode: entry.mode
      }));
  });
  res.render("leaderboards", { highscores });
  console.log("Highscores passed to leaderboards view:", highscores);
  console.log("Leaderboard fetched successfully");
});

export default router;