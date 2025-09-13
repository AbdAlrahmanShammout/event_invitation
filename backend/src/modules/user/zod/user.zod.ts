import {
  BaseZodSchema,
  ZodBigIntNullable,
  ZodDateNullable,
  ZodString,
} from '@/common/base/base.zod';
import { z } from 'zod';
import { Role } from '@prisma/client';

export type UserZodType = z.infer<typeof UserZodSchema>;

export const UserZodSchema = BaseZodSchema.extend({
  name: ZodString,
  hallId: ZodBigIntNullable,
  email: z.email(),
  role: z.enum(Role),
  lastLoginAt: ZodDateNullable,
});
