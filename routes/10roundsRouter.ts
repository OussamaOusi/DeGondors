import { Router} from "express";
import { userCollection } from "../database"; // Zorg dat dit jouw MongoDB users collectie is
import { ObjectId } from "mongodb";

const router = Router();

// ✅ Pagina weergeven
router.get("/10rounds", (req,res) => {
    res.render("10rounds");
});

// ✅ Quote liken
router.post("/api/quotes/like", async (req,res) => {
    const quote = req.body.quote;
    const user = req.session?.user;

    if (!user || !quote) {
        return res.status(400).json({ message: "Ongeldige aanvraag." });
    }

    try {
        await userCollection.updateOne(
            { _id: new ObjectId(user._id) },
            { $addToSet: { favorites: quote } } // voorkomt dubbele quotes
        );
        res.status(200).json({ message: "Quote toegevoegd aan favorieten." });
    } catch (error) {
        console.error("Fout bij liken:", error);
        res.status(500).json({ message: "Serverfout." });
    }
});

// ✅ Quote disliken
router.post("/api/quotes/dislike", async (req,res) => {
    const quote = req.body.quote;
    const user = req.session?.user;

    if (!user || !quote) {
        return res.status(400).json({ message: "Ongeldige aanvraag." });
    }

    try {
        await userCollection.updateOne(
            { _id: new ObjectId(user._id) },
            { $addToSet: { blacklist: quote } } // voorkomt dubbele quotes
        );
        res.status(200).json({ message: "Quote toegevoegd aan blacklist." });
    } catch (error) {
        console.error("Fout bij disliken:", error);
        res.status(500).json({ message: "Serverfout." });
    }
});

export default router;
