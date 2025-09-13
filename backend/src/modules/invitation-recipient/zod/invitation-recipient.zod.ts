import {
  BaseZodSchema,
  ZodBigInt,
  ZodDate,
  ZodDateNullable,
  ZodString,
} from '@/common/base/base.zod';
import { z } from 'zod';
import { MessageStatus } from '@prisma/client';

export type InvitationRecipientZodType = z.infer<typeof InvitationRecipientZodSchema>;

export const InvitationRecipientZodSchema = BaseZodSchema.extend({
  invitationId: ZodBigInt,
  invitationMessageId: ZodBigInt,
  recipientName: ZodString,
  phoneNumber: ZodString,
  messageStatus: z.enum(MessageStatus).default(MessageStatus.pending),
  sendAt: ZodDate,
  sentAt: ZodDateNullable,
});
