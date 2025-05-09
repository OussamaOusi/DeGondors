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
import roundsRouter from "./routes/roundsRouter";
import blacklistRouter from "./routes/blacklistRouter";
import favoritesRouter from "./routes/favoritesRouter";
import leaderboardsRouter from "./routes/leaderboardsRouter";
import profileRouter from "./routes/profileRouter";



const app = express();
const PORT = process.env.PORT || 3000;

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/css',express.static(path.join(__dirname, "css")));
app.use('/images',express.static(path.join(__dirname, "images")));
app.set('views', path.join(__dirname, "views"));
app.use(session);



app.use( loginRouter, indexRoutes, apiRoutes, registrationRouter, homeRouter, roundsRouter, blacklistRouter, favoritesRouter, leaderboardsRouter, profileRouter);


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
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (e) {
        console.log(e);
        process.exit(1); 

}});
