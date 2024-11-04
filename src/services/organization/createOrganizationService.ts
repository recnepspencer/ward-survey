// src/services/organizationService.ts

import { prisma } from '@/lib/prisma';
import { OrganizationType, Role } from '@prisma/client';
import { ensureAdminRoleExists } from '../roleService';

interface CreateOrganizationData {
  name: string;
  type: OrganizationType;
}

export const createOrganization = async (data: CreateOrganizationData, userId: string) => {
    console.log('Creating organization with data:', data, 'and userId:', userId);
  
    // Step 1: Check if the user is already part of an organization
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.organizationId) {
      throw new Error('User is already part of an organization');
    }
  
    // Step 2: Ensure the admin role exists or create it
    const adminRole: Role = await ensureAdminRoleExists();
  
    // Step 3: Use a transaction to create the organization and assign roles
    const organization = await prisma.$transaction(async (tx) => {
      console.log('Starting transaction to create organization');
      
      // Create the organization
      const org = await tx.organization.create({
        data: {
          name: data.name,
          type: data.type,
        },
      });
      console.log('Organization created:', org);
  
      // Assign the user to the organization
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { organizationId: org.id },
      });
      console.log('User updated with organizationId:', updatedUser.organizationId);
  
      // Create the UserRole entry to assign the admin role to the user
      const userRole = await tx.userRole.create({
        data: {
          userId: userId,
          roleId: adminRole.id,
          organizationId: org.id,
        },
      });
      console.log('UserRole created:', userRole);
  
      return org;
    });
  
    console.log('Transaction complete, organization returned:', organization);
    return organization;
  };
  
