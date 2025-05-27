import express, { Request, Response } from 'express';
import { scoreCollection } from '../database';

const router = express.Router();

router.get('/leaderboards', async (req, res) => {
  console.log("Fetching leaderboard for all modes");
  const scores = await scoreCollection
    .aggregate([
      { $sort: { score: -1, date: 1 } },
      { $limit: 7 }, 
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
    mode: entry.mode
  }));
  res.render("leaderboards", { highscores });
  console.log("Leaderboard fetched successfully");
});

export default router;