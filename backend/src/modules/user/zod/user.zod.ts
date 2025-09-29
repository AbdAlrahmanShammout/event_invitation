import { Role } from '@prisma/client';
import { z } from 'zod';

import {
  BaseZodSchema,
  ZodDateNullable,
  ZodNumberNullable,
  ZodString,
} from '@/common/base/base.zod';

export type UserZodType = z.infer<typeof UserZodSchema>;

export const UserZodSchema = BaseZodSchema.extend({
  name: ZodString,
  passwordHash: ZodString,
  hallId: ZodNumberNullable,
  email: z.string().email(),
  role: z.nativeEnum(Role),
  lastLoginAt: ZodDateNullable,
});
