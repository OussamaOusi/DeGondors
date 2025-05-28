import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    username: string,
    email: string;
    password?: string;
    role: "ADMIN" | "USER";
    avatar?: string; 
}

export interface QuoteWithData {
    quote: string;
    characterId: string;
    characterName: string;
    wikiUrl: string;
    movie?: string;
    reason?: string; 
}