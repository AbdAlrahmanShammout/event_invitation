import {
  BaseZodSchema,
  ZodDateNullable,
  ZodNumber,
  ZodString,
  ZodStringNullable,
} from '@/common/base/base.zod';
import { z } from 'zod';
import { HallStatus } from '@/modules/hall/enum/general.enum';

export type HallZodType = z.infer<typeof HallZodSchema>;

export const HallZodSchema = BaseZodSchema.extend({
  name: ZodString,
  description: ZodStringNullable,
  address: ZodString,
  email: ZodString,
  phone: ZodString,
  status: z.enum(HallStatus),
  ownerId: ZodNumber,
  balance: ZodNumber,
});
