import express, { Request, Response } from 'express';
import { scoreCollection } from '../database';

const router = express.Router();

router.get('/leaderboards', async (req, res) => {
  console.log("Fetching leaderboard for 10 Rounds mode");
  const scores = await scoreCollection
    .aggregate([
      { $sort: { score: -1, date: 1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" }
    ])
    .toArray();

  const highscores = scores.map((entry, index) => ({
    position: index + 1,
    username: entry.user.email,
    score: entry.score,
  }));
  res.render("leaderboards", { highscores });
  console.log("Leaderboard fetched successfully");
});

export default router;