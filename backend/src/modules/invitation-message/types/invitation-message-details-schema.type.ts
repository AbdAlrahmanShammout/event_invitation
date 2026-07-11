import type { Prisma } from '@prisma/client';

import { OptionalRelations } from '@/common/base/base.entity';

export type InvitationMessageType = OptionalRelations<
  Prisma.InvitationMessageGetPayload<{
    include: {
      invitation: true;
      recipients: true;
    };
  }>
>;
