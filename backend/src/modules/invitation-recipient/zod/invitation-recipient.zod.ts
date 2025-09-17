import {
  BaseZodSchema,
  ZodNumber,
  ZodDate,
  ZodDateNullable,
  ZodString,
} from '@/common/base/base.zod';
import { z } from 'zod';
import { MessageStatus } from '@prisma/client';

export type InvitationRecipientZodType = z.infer<typeof InvitationRecipientZodSchema>;

export const InvitationRecipientZodSchema = BaseZodSchema.extend({
  invitationId: ZodNumber,
  invitationMessageId: ZodNumber,
  recipientName: ZodString,
  phoneNumber: ZodString,
  messageStatus: z.nativeEnum(MessageStatus).default(MessageStatus.pending),
  sendAt: ZodDate,
  sentAt: ZodDateNullable,
});
