import express from "express";
import { userCollection } from "../database";

const router = express.Router();

router.get("/favorites", async (req, res) => {
    const userId = req.session.user?._id;
    try {
        const user = await userCollection.findOne({ _id: userId });
        res.json(user?.favorites || []);
    } catch (e) {
        res.status(500).send("Fout bij ophalen van favorites");
    }
});

router.post("/favorites", async (req, res) => {
    const userId = req.session.user?._id;
    const { quote, character, movie } = req.body;

    try {
        await userCollection.updateOne(
            { _id: userId },
            { $addToSet: { favorites: { quote, character, movie } } }
        );
        res.status(200).send("Quote toegevoegd aan favorites");
    } catch (e) {
        res.status(500).send("Fout bij toevoegen van favorite");
    }
});



export default router;
