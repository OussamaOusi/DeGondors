import { Router, Request, Response } from 'express';
import { registerUser } from '../database';

const router = Router();

router.get("/registration", (req, res) => {
    res.render("registration");
});

router.post("/register", async (req, res) => {
    const { username, email, password, ["confirm-password"]: confirmPassword } = req.body;

    try {
        await registerUser(username, email, password, confirmPassword);
        res.redirect("/login");
    } catch (err: any) {
        console.error("Fout bij registreren:", err.message);
        res.status(400).send(err.message);
    }
});

export default router;