import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { User } from "./types";
import bcrypt from "bcrypt";

export const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb+srv://robinsegers1:admin@degondors.sr4vjny.mongodb.net/";


export const client = new MongoClient(MONGODB_URI);

export const userCollection = client.db("DeGondors").collection<User>("Users");
export const favoriteQuotesCollection = client.db("DeGondors").collection("FavoriteQuotes");
export const BlacklistQuotesCollection = client.db("DeGondors").collection("BlacklistQuotes");

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

export async function login(email: string, password: string) {
    console.log("-- login() called met email =", email);
    const totalUsers = await userCollection.countDocuments();
    console.log(`-- users in collection: ${totalUsers}`);

    const foundUser = await userCollection.findOne({ email });
    console.log("-- findOne resultaat:", foundUser);

    if (!foundUser) {
        throw new Error("User not found");
    }
    let user : User | null = await userCollection.findOne<User>({email: email});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            console.log("User logged in")
            return user;
        } else {
            console.log("password wrong")
            throw new Error("Password incorrect");
        }
    } else {
        console.log("user not found")
        throw new Error("User not found");
    }
}

export async function registerUser(username: string, email: string, password: string, confirmPassword: string) {
    if (!username || !email || !password || !confirmPassword) {
        throw new Error("Alle velden zijn verplicht.");
    }

    if (password !== confirmPassword) {
        throw new Error("Wachtwoorden komen niet overeen.");
    }

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        throw new Error("Gebruiker bestaat al.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userCollection.insertOne({
        email,
        password: hashedPassword,
        role: "USER",
    });

    return true;
}