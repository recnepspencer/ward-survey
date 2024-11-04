import { NextResponse } from 'next/server';
import { loginUser } from '@/services/authService';
import { z } from 'zod';
import { ValidationError, AuthError } from '@/errors';
import { errorHandler } from '@/utils/errorHandler';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsedData = loginSchema.safeParse(data);

    if (!parsedData.success) {
      throw new ValidationError('Invalid login data');
    }

    const token = await loginUser(parsedData.data.email, parsedData.data.password);

    if (!token) {
      throw new AuthError('Invalid email or password');
    }

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
