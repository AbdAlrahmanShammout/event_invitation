import type { Prisma } from '@prisma/client';

export const invitationDetailsInclude = {
  creator: true,
  messages: {
    include: {
      recipients: true,
    },
  },
  recipients: {
    include: {
      invitationMessage: true,
    },
  },
} satisfies Prisma.InvitationInclude;
