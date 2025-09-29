import { z } from 'zod';
import { BaseZodSchema } from '@/common/base/base.zod';
import { ZodString, ZodStringNullable, ZodNumber, ZodBoolean } from '@/common/base/base.zod';

export type WhatsAppSessionZodType = z.infer<typeof WhatsAppSessionZodSchema>;

export const WhatsAppSessionZodSchema = BaseZodSchema.extend({
  hallId: ZodNumber,
  sessionId: ZodString,
  isActive: ZodBoolean,
  qrCode: ZodStringNullable.optional(),
  phoneNumber: ZodStringNullable.optional(),
  lastSeen: z.date().optional(),
});
