import { Router, Request, Response } from "express";
import { userCollection } from "../database";
import { ObjectId } from "mongodb";
import { QuoteWithData } from "../types";

const router = Router();

router.get("/10rounds", (req: Request, res: Response) => {
    res.render("10rounds");
});

export default router;
