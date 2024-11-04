// src/services/organization/getOrganizationService.ts

import { prisma } from '@/lib/prisma';

export const getOrganizationById = async (id: string) => {
  const organization = await prisma.organization.findUnique({
    where: { id },
  });
  
  console.log('Fetched Organization:', organization);
  
  return organization;
};

export const getAllOrganizations = async () => {
  const organizations = await prisma.organization.findMany();
  
  console.log('Fetched All Organizations:', organizations);
  
  return organizations;
};

export const getOrganizationByUserId = async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });
  
    if (!user?.organization) {
      console.log(`No organization found for user ${userId}`);
      return null;
    }
  
    console.log('Fetched Organization:', user.organization);
    return user.organization;
  };