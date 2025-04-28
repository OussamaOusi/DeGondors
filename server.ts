import express from "express";
import path from "path";
import { connect } from "./database";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.json());
app.set('views', path.join(__dirname, "views"));

app.get("/", async(req, res) =>  {
    res.render("index");
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