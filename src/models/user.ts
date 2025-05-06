import { getDB } from '../db';
import bcrypt from 'bcrypt';

export interface User {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return getDB().collection('Users').insertOne({
    ...user,
    password: hashedPassword
  });
};

export const findUserByUsername = async (username: string) => {
  return getDB().collection<User>('Users').findOne({ username });
};