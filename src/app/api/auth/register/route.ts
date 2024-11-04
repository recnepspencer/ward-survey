import { NextResponse } from 'next/server';
import { createControllers } from '@/utils/createController';
import { userSchema } from '@/app/api/user/schema';
import { ValidationError } from '@/errors';
import { errorHandler } from '@/utils/errorHandler';
import { createUser } from '@/services/userService';

const { postHandler } = createControllers({
  model: 'user',
  validate: (data) => {
    try {
      return userSchema.parse(data);
    } catch (error) {
      throw new ValidationError('Invalid user data');
    }
  },
  createFunction: createUser, // Use the custom createUser function
  customGetById: (user) => {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

export async function POST(req: Request) {
  try {
    return await postHandler(req);
  } catch (error) {
    return errorHandler(error);
  }
}