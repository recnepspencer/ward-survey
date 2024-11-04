// src/app/api/organization/route.ts

import { NextResponse } from 'next/server';
import { createControllers } from '@/utils/createController';
import { errorHandler } from '@/utils/errorHandler';
import { useAuth } from '@/utils/useAuth';
import { createOrganization } from '@/services/organization/createOrganizationService';
import { getOrganizationByUserId } from '@/services/organization/getOrganizationService';
import { OrganizationType } from '@prisma/client';

// Custom create function with user ID
const customCreateOrganization = async (
  data: { name: string; type: OrganizationType },
  req?: Request
) => {
  if (!req) throw new Error('Unauthorized');

  const user = await useAuth(req);
  return await createOrganization(data, user.id);
};

// Custom get function for fetching user’s organization
const customGetOrganization = async (req: Request) => {
  const user = await useAuth(req);
  const organization = await getOrganizationByUserId(user.id);

  if (!organization) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }
  return NextResponse.json(organization);
};

// Define controllers with custom functions
const { postHandler } = createControllers({
  model: 'organization',
  createFunction: customCreateOrganization,
});

export async function POST(req: Request) {
  try {
    return await postHandler(req);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(req: Request) {
  try {
    return await customGetOrganization(req);
  } catch (error) {
    return errorHandler(error);
  }
}
