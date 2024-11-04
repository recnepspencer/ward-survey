// src/services/userService.ts

import { DuplicateEntryError } from '@/errors/DuplicateEntryError';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Creates a new user with hashed password.
 * @param data Prisma.UserCreateInput
 * @returns Created user without passwordHash
 */
export const createUser = async (data: {
    email: string;
    password: string;
    name?: string;
  }) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
  
    if (existingUser) {
      throw new DuplicateEntryError('Email already in use');
    }
  
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(data.password, 10); // Use data.password here
  
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash: hashedPassword,
      },
    });
  
    // Exclude passwordHash from the returned user
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

/**
 * Finds a user by email.
 * @param email string
 * @returns User object or null
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Finds a user by ID.
 * @param id string
 * @returns User object or null
 */
export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
