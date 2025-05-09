import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    password?: string;
    role: "ADMIN" | "USER";
    favorites?: QuoteWithData[];
}

export interface QuoteWithData {
    quote: string;
    character: string;
    movie: string;
}