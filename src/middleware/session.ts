import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import * as dotenv from 'dotenv';

dotenv.config();

const MongoStore = MongoDBStore(session);

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    uri: process.env.MONGODB_URI!,
    collection: 'sessions',
    databaseName: 'DeGondors'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 uur
  }
});