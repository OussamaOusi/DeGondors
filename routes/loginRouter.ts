import express from 'express';
import { login } from '../database';
import { User } from '../types';


const router = express.Router();

router.get("/login", async (req, res) => {
   res.render("login", {
  currentPath: req.path
});
});

router.post("/login", async (req, res) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    console.log("Trying to log in user")
    try {
        console.log("loggin in?")
        let user: User = await login(email, password);
        delete user.password;
        req.session.user = user;
        res.redirect("/home")
    } catch (e: any) {
        res.redirect("/login");
    }
});

export default router;
