import {
  BaseZodSchema,
  ZodNumberNullable,
  ZodDateNullable,
  ZodString,
} from '@/common/base/base.zod';
import { z } from 'zod';
import { Role } from '@prisma/client';

export type UserZodType = z.infer<typeof UserZodSchema>;

export const UserZodSchema = BaseZodSchema.extend({
  name: ZodString,
  hallId: ZodNumberNullable,
  email: z.string().email(),
  role: z.nativeEnum(Role),
  lastLoginAt: ZodDateNullable,
});
