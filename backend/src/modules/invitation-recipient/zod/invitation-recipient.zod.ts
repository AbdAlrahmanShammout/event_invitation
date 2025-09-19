import { MessageStatus } from '@prisma/client';
import { z } from 'zod';

import {
  BaseZodSchema,
  ZodDate,
  ZodDateNullable,
  ZodNumber,
  ZodString,
} from '@/common/base/base.zod';

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
