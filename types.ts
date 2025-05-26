import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    password?: string;
    role: "ADMIN" | "USER";
}

export interface QuoteWithData {
    quote: string;
    characterId: string;
    characterName: string;
    wikiUrl: string;
    movie?: string;
    reason?: string; 
}