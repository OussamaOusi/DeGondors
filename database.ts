import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { User } from "./types";
import bcrypt from "bcrypt";

export const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb+srv://robinsegers1:admin@degondors.sr4vjny.mongodb.net/";


export const client = new MongoClient(MONGODB_URI);

export const userCollection = client.db("DeGondors").collection<User>("Users");

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    await client.connect();
    await createInitialUser();
    console.log("Connected to database");
    process.on("SIGINT", exit);
}

const saltRounds : number = 10;

async function createInitialUser() {
    if (await userCollection.countDocuments() > 0) {
        return;
    }
    let email : string | undefined = process.env.ADMIN_EMAIL;
    let password : string | undefined = process.env.ADMIN_PASSWORD;
    if (email === undefined || password === undefined) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment");
    }
    await userCollection.insertOne({
        email: email,
        password: await bcrypt.hash(password, saltRounds),
        role: "ADMIN"
    });
}