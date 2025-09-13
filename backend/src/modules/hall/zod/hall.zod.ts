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
  status: z.enum(HallStatus),
  ownerId: ZodBigInt,
  balance: ZodNumber,

  owner: z.any() as z.ZodType<UserZodType | null | undefined>,
  employees: z.any().nullish() as z.ZodType<UserZodType[] | null | undefined>,
  invitations: z.any().nullish() as z.ZodType<InvitationZodType[] | null | undefined>,
});
