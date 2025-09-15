import {
  BaseZodSchema,
  ZodBigInt,
  ZodNumber,
  ZodString,
  ZodStringNullable,
} from '@/common/base/base.zod';
import { z } from 'zod';
import { HallStatus } from '@prisma/client';
import { UserZodType } from '@/modules/user/zod/user.zod';
import { InvitationZodType } from '@/modules/invitation/zod/invitation.zod';

export type HallZodType = z.infer<typeof HallZodSchema>;

export const HallZodSchema = BaseZodSchema.extend({
  name: ZodString,
  description: ZodStringNullable,
  address: ZodString,
  email: ZodString,
  phone: ZodString,
  status: z.enum(Object.values(HallStatus) as [string, ...string[]]),
  ownerId: ZodBigInt,
  balance: ZodNumber,

  owner: (z.any() as z.ZodType<UserZodType | null | undefined>).optional(),
  employees: (z.any().nullish() as z.ZodType<UserZodType[] | null | undefined>).optional(),
  invitations: (z.any().nullish() as z.ZodType<InvitationZodType[] | null | undefined>).optional(),
});
