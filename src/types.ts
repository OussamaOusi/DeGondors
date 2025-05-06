import 'express-session';

declare module 'express-session' {
  interface Session {
    userId: string;
  }
}

declare module 'mongodb' {
    export interface ObjectId {
      toString(): string;
    }
}