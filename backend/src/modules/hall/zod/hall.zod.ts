import { HallStatus } from '@prisma/client';
import { z } from 'zod';

import { BaseZodSchema, ZodNumber, ZodString, ZodStringNullable } from '@/common/base/base.zod';
import { InvitationZodType } from '@/modules/invitation/zod/invitation.zod';
import { UserZodType } from '@/modules/user/zod/user.zod';

export type HallZodType = z.infer<typeof HallZodSchema>;

export const HallZodSchema = BaseZodSchema.extend({
  name: ZodString,
  description: ZodStringNullable,
  address: ZodString,
  email: ZodString,
  phone: ZodString,
  status: z.nativeEnum(HallStatus),
  ownerId: ZodNumber,
  balance: ZodNumber,

  owner: (z.any() as z.ZodType<UserZodType | null | undefined>).optional(),
  employees: (z.any().nullish() as z.ZodType<UserZodType[] | null | undefined>).optional(),
  invitations: (z.any().nullish() as z.ZodType<InvitationZodType[] | null | undefined>).optional(),
});
