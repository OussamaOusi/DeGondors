import express from "express";
import { ObjectId } from "mongodb";
import { favoriteQuotesCollection } from "../database";

const router = express.Router();

// 1. GET /api/favorites/  → toont de EJS-view
router.get("/", (req, res) => {
  res.render("favorites");
});

export default router;
