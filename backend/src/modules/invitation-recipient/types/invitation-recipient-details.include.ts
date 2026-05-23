import type { Prisma } from '@prisma/client';

export const invitationRecipientDetailsInclude = {
  invitation: true,
  invitationMessage: true,
} satisfies Prisma.InvitationRecipientInclude;
