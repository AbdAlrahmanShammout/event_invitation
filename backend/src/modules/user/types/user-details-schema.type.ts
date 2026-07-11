import type { Prisma } from '@prisma/client';

import { OptionalRelations } from '@/common/base/base.entity';

export type UserType = OptionalRelations<
  Prisma.UserGetPayload<{
    include: {
      hall: true;
      ownedHalls: true;
      createdInvites: true;
      accountStateChanges: true;
      creditTransactions: true;
    };
  }>
>;
