import express from "express";
import path from "path";
import { connect, login } from "./database";
import session from "./session";
import { User } from "./types";
import { secureMiddleware } from "./secureMiddleware";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.set('views', path.join(__dirname, "views"));
app.use(session);

app.get("/", secureMiddleware, async(req, res) =>  {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("./login", async (req,res) => {
    const email: string = req.body.email;
    const password : string = req.body.password;
    try {
        let user : User = await login(email, password);
        delete user.password;
        req.session.user = user;
        res.redirect("/")
    } catch (e: any) {
        res.redirect("/login");
    }
})

app.listen(app.get("port"), async() => {
    try {
        await connect();
        console.log("Server started on http://localhost:" + app.get('port'));
    } catch (e) {
        console.log(e);
        process.exit(1); 
    }
});