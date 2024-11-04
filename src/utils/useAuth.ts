// src/utils/useAuth.ts

import { getUserFromToken } from './auth';
import { User } from '@prisma/client';

/**
 * Middleware to authenticate the user based on the Authorization header in the request.
 * @param req - The incoming request with Authorization header.
 * @returns The authenticated user or throws an error if unauthenticated.
 */
export const useAuth = async (req: Request): Promise<User> => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  const user = await getUserFromToken(token);
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
};
