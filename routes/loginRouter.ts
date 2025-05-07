import express, { Request, Response } from 'express';
import { login } from '../database';
import { User } from '../types';
import { secureMiddleware } from '../secureMiddleware';


    const router = express.Router();

    router.get("/login", async (req, res) => {
        res.render("login");
    });

    router.post("/login", async (req,res) => {
        const email: string = req.body.email;
        const password : string = req.body.password;
        console.log("Trying to log in user")
        try {
            console.log("loggin in?")
            let user : User = await login(email, password);
            console.log("User logged in")
            delete user.password;
            req.session.user = user;
            res.redirect("/")
        } catch (e: any) {
            res.redirect("/login");
        }
    });
    
    export default router;