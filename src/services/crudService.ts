// src/services/crudService.ts

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { ModelName, CreateInputMap, FindManyArgsMap, FindUniqueWhereMap, UpdateDataMap } from '../types/prisma';

/**
 * Generic Create function
 */
export const createItem = async <T extends ModelName>(
  model: T,
  data: CreateInputMap[T]
) => {
  return (prisma[model] as any).create({ data });
};

/**
 * Generic Find Many function
 */
export const findManyItems = async <T extends ModelName>(
  model: T,
  params?: FindManyArgsMap[T]
) => {
  return (prisma[model] as any).findMany(params);
};

/**
 * Generic Find Unique function
 */
export const findUniqueItem = async <T extends ModelName>(
  model: T,
  where: FindUniqueWhereMap[T]
) => {
  return (prisma[model] as any).findUnique({ where });
};

/**
 * Generic Update function
 */
export const updateItem = async <T extends ModelName>(
  model: T,
  where: FindUniqueWhereMap[T],
  data: UpdateDataMap[T]
) => {
  return (prisma[model] as any).update({ where, data });
};

/**
 * Generic Delete function
 */
export const deleteItem = async <T extends ModelName>(
  model: T,
  where: FindUniqueWhereMap[T]
) => {
  return (prisma[model] as any).delete({ where });
};
