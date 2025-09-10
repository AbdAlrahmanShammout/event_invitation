import { BaseZodSchema, ZodNumber, ZodString } from '@/common/base/base.zod';
import { z } from 'zod';

export type InvitationMessageZodType = z.infer<typeof InvitationMessageZodSchema>;

export const InvitationMessageZodSchema = BaseZodSchema.extend({
  content: ZodString,
  invitationId: ZodNumber,
});
