import type { Prisma } from '@prisma/client';

import { OptionalRelations } from '@/common/base/base.entity';

export type HallType = OptionalRelations<
  Prisma.HallGetPayload<{
    include: {
      owner: true;
      employees: true;
      invitations: true;
      whatsappSession: true;
      accountState: true;
      creditBalance: true;
      creditTransactions: true;
    };
  }>
>;
