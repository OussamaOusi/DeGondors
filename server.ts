// // src/server.ts
// import express, { Request, Response } from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import indexRoutes from './routes/indexRoutes';
// import apiRoutes from './routes/apiRoutes'; // voor de /api/quote

// dotenv.config(); // Laadt variabelen uit .env bestand

// const app = express();
// const PORT = process.env.PORT || 3000;

// // 1. View engine instellen
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // 2. Static bestanden serveren
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'css')));
// app.use('/images', express.static(path.join(__dirname, 'images')));

// // 3. Body parsers (voor formulieren / JSON)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // 4. Routes koppelen
// app.use('/', indexRoutes); // Webpagina's
// app.use('/api', apiRoutes); // API-endpoints (bijv. /api/quote)

// // 6. Server starten
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
import express from "express";
import path from "path";
import { connect, login, registerUser, userCollection } from "./database";
import session from "./session";
import { User } from "./types";
import { secureMiddleware } from "./secureMiddleware";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));
app.use(session);

app.get("/", async(req, res) =>  {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req,res) => {
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
})

app.get("/registration", (req, res) => {
    res.render("registration");
});

app.post("/register", async (req, res) => {
    const { username, email, password, ["confirm-password"]: confirmPassword } = req.body;

    try {
        await registerUser(username, email, password, confirmPassword);
        res.redirect("/login");
    } catch (err: any) {
        console.error("Fout bij registreren:", err.message);
        res.status(400).send(err.message);
    }
});


app.post("/logout", async(req, res) => {
    console.log(">>> Voor destroy:", req.session);  
    req.session.destroy(() => {
        res.redirect("/");
    });
    console.log(">>> Na destroy, req.session is:", req.session); 
});

app.listen(app.get("port"), async() => {
    try {
        await connect();
        console.log("Server started on http://localhost:" + app.get('port'));
    } catch (e) {
        console.log(e);
        process.exit(1); 
    }
});