import type { Hall, Prisma } from '@prisma/client';

import { hallDetailsInclude } from '@/modules/hall/types/hall-details.include';

type HallDetailsPayload = Prisma.HallGetPayload<{
  include: typeof hallDetailsInclude;
}>;

export type HallDetailsSchema = Hall & Partial<Pick<HallDetailsPayload, 'owner' | 'employees' | 'invitations'>>;
