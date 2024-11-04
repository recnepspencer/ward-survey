// src/types/organization.ts

import { Organization as PrismaOrganization } from '@prisma/client';

export interface Organization extends PrismaOrganization {
  users: Array<{
    userId: string;
    roleId: string;
    organizationId: string;
  }>;
}
