import type { Prisma } from '@prisma/client';

export const hallDetailsInclude = {
  owner: true,
  employees: true,
  invitations: true,
} satisfies Prisma.HallInclude;
