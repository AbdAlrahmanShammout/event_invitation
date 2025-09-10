import {
  BaseZodSchema,
  ZodDate,
  ZodDateNullable,
  ZodNumber,
  ZodString,
  ZodStringNullable,
} from '@/common/base/base.zod';
import { z } from 'zod';
import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';

export type InvitationRecipientZodType = z.infer<typeof InvitationRecipientZodSchema>;

export const InvitationRecipientZodSchema = BaseZodSchema.extend({
  invitationId: ZodNumber,
  invitationMessageId: ZodNumber,
  recipientName: ZodString,
  phoneNumber: ZodString,
  messageStatus: z.enum(MessageStatus).default(MessageStatus.PENDING),
  sendAt: ZodDate,
  sentAt: ZodDateNullable,
});
