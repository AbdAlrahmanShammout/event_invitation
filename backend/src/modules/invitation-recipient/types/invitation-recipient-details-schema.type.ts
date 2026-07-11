import type { Prisma } from '@prisma/client';

import { OptionalRelations } from '@/common/base/base.entity';

export type InvitationRecipientType = OptionalRelations<
  Prisma.InvitationRecipientGetPayload<{
    include: {
      invitation: true;
      invitationMessage: true;
    };
  }>
>;
