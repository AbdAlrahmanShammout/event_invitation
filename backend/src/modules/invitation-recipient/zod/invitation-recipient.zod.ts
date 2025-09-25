import { MessageStatus } from '@prisma/client';
import { z } from 'zod';

import {
  BaseZodSchema,
  ZodDate,
  ZodDateNullable,
  ZodNumber,
  ZodString,
  ZodStringNullable,
} from '@/common/base/base.zod';

export type InvitationRecipientZodType = z.infer<typeof InvitationRecipientZodSchema>;

export const InvitationRecipientZodSchema = BaseZodSchema.extend({
  invitationId: ZodNumber,
  invitationMessageId: ZodNumber.optional(),
  recipientName: ZodString,
  phoneNumber: ZodString,
  messageStatus: z.nativeEnum(MessageStatus).default(MessageStatus.pending),
  sendAt: ZodDateNullable,
  sentAt: ZodDateNullable,
  submittedAt: ZodDateNullable,
  notes: ZodStringNullable,
});
