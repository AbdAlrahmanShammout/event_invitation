import {
  BaseZodSchema,
  ZodDate,
  ZodNumber,
  ZodString,
  ZodStringNullable,
} from '@/common/base/base.zod';
import { z } from 'zod';

export type InvitationZodType = z.infer<typeof InvitationZodSchema>;

export const InvitationZodSchema = BaseZodSchema.extend({
  title: ZodString,
  description: ZodStringNullable,
  eventDate: ZodDate,
  hallId: ZodNumber,
  creatorId: ZodNumber,
});
