// src/services/authService.ts

import { findUserByEmail, findUserById } from './userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// src/store/slices/authSlice.ts
  

/**
 * Verifies user credentials and returns a JWT token.
 * @param email string
 * @param password string
 * @returns JWT token or null
 */
export const loginUser = async (email: string, password: string): Promise<string | null> => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return null;
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return token;
};

/**
 * Decodes and verifies a JWT token.
 * @param token string
 * @returns Decoded token payload or null
 */
export const verifyToken = (token: string): any | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
