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
import indexRoutes from "./routes/indexRoutes";
import apiRoutes from "./routes/apiRoutes";
import loginRouter from "./routes/loginRouter";
import registrationRouter from "./routes/registrationRouter"
import homeRouter from "./routes/homeRouter";
import tenRoundsRouter from "./routes/10roundsRouter";
import favoritesRouter from "./routes/favoritesRouter";


const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.set('views', path.join(__dirname, "views"));
app.use(session);



app.use( loginRouter, indexRoutes, apiRoutes, registrationRouter, homeRouter, tenRoundsRouter, favoritesRouter);


//sessions moet gefixt worden
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