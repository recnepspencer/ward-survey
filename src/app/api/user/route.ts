// src/app/api/user/route.ts

import { NextResponse } from 'next/server';
import { createControllers } from '@/utils/createController';
import { userSchema } from './schema';
import { ModelName } from '@/types/prisma';

// Custom formatter for getAll to exclude sensitive fields
const formatUsers = (users: any[]) => {
  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    // Exclude passwordHash or other sensitive information
  }));
};

// Custom formatter for getById to exclude sensitive fields
const formatUser = (user: any) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    // Exclude passwordHash
  };
};

// Create controllers with validation and custom formatting
const { getHandler, postHandler, putHandler, deleteHandler } = createControllers({
  model: 'user',
  validate: (data) => userSchema.parse(data),
  customGetAll: formatUsers,
  customGetById: formatUser,
});

export async function GET(req: Request) {
  return await getHandler(req);
}

export async function POST(req: Request) {
  return await postHandler(req);
}

export async function PUT(req: Request) {
  return await putHandler(req);
}

export async function DELETE(req: Request) {
  return await deleteHandler(req);
}
