import { BaseZodSchema, ZodDateNullable, ZodString } from '@/common/base/base.zod';
import { z } from 'zod';
import { UserRole } from '@/modules/user/enum/general.enum';

export type UserZodType = z.infer<typeof UserZodSchema>;

export const UserZodSchema = BaseZodSchema.extend({
  name: ZodString,
  email: z.email(),
  role: z.enum(UserRole),
  lastLoginAt: ZodDateNullable,
});
