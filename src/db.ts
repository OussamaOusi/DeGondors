import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

let db: Db;

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI ontbreekt in .env');
  
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db();
  console.log('Verbonden met MongoDB');
};

export const getDB = () => {
  if (!db) throw new Error('Database niet geïnitialiseerd');
  return db;
};