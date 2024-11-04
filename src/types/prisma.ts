// src/types/prisma.ts

import { Prisma } from '@prisma/client';

export type ModelName =
  | 'user'
  | 'organization'
  | 'role'
  | 'userRole'
  | 'survey'
  | 'question'
  | 'response'
  | 'adminInvitation'
  | 'auditLog';

export type CreateInputMap = {
  user: Prisma.UserCreateInput;
  organization: Prisma.OrganizationCreateInput;
  role: Prisma.RoleCreateInput;
  userRole: Prisma.UserRoleCreateInput;
  survey: Prisma.SurveyCreateInput;
  question: Prisma.QuestionCreateInput;
  response: Prisma.ResponseCreateInput;
  adminInvitation: Prisma.AdminInvitationCreateInput;
  auditLog: Prisma.AuditLogCreateInput;
};

export type FindManyArgsMap = {
  user: Prisma.UserFindManyArgs;
  organization: Prisma.OrganizationFindManyArgs;
  role: Prisma.RoleFindManyArgs;
  userRole: Prisma.UserRoleFindManyArgs;
  survey: Prisma.SurveyFindManyArgs;
  question: Prisma.QuestionFindManyArgs;
  response: Prisma.ResponseFindManyArgs;
  adminInvitation: Prisma.AdminInvitationFindManyArgs;
  auditLog: Prisma.AuditLogFindManyArgs;
};

export type FindUniqueWhereMap = {
  user: Prisma.UserWhereUniqueInput;
  organization: Prisma.OrganizationWhereUniqueInput;
  role: Prisma.RoleWhereUniqueInput;
  userRole: Prisma.UserRoleWhereUniqueInput;
  survey: Prisma.SurveyWhereUniqueInput;
  question: Prisma.QuestionWhereUniqueInput;
  response: Prisma.ResponseWhereUniqueInput;
  adminInvitation: Prisma.AdminInvitationWhereUniqueInput;
  auditLog: Prisma.AuditLogWhereUniqueInput;
};

export type UpdateDataMap = {
  user: Prisma.UserUpdateInput;
  organization: Prisma.OrganizationUpdateInput;
  role: Prisma.RoleUpdateInput;
  userRole: Prisma.UserRoleUpdateInput;
  survey: Prisma.SurveyUpdateInput;
  question: Prisma.QuestionUpdateInput;
  response: Prisma.ResponseUpdateInput;
  adminInvitation: Prisma.AdminInvitationUpdateInput;
  auditLog: Prisma.AuditLogUpdateInput;
};
