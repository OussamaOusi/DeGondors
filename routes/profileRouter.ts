import { Router } from "express";

const router = Router();

router.get("/profile", (req, res) => {
    const user = req.session.user; // of waar je de user hebt opgeslagen in de sessie
    if (!user) {
        return res.redirect("/login"); // eventueel beveiliging als niet ingelogd
    }
    res.render("profile", { user }); // <-- HIER user meegeven
});

export default router;