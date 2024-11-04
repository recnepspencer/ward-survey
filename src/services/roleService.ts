// src/services/roleService.ts

import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export const ensureAdminRoleExists = async (): Promise<Role> => {
  let adminRole = await prisma.role.findUnique({
    where: { name: 'admin' },
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'admin',
        description: 'Administrator with full access',
      },
    });
  }

  return adminRole;
};
