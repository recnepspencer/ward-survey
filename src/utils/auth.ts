// src/utils/auth.ts

import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET as string; // Ensure JWT_SECRET is set in your .env file

/**
 * Decodes a JWT token and retrieves the user from the database.
 * @param token - The JWT token from the authorization header.
 * @returns The authenticated user or null if invalid.
 */
export const getUserFromToken = async (token: string): Promise<User | null> => {
  try {
    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // Retrieve the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user || null;
  } catch (error) {
    // Return null if token is invalid or user is not found
    console.error('Invalid token or user not found:', error);
    return null;
  }
};
