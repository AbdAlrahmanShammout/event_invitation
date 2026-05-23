import type { Prisma } from '@prisma/client';

export const invitationMessageDetailsInclude = {
  recipients: true,
} satisfies Prisma.InvitationMessageInclude;
