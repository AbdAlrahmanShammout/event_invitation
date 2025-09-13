import { BaseZodSchema, ZodBigInt, ZodString } from '@/common/base/base.zod';
import { z } from 'zod';
import { InvitationRecipientZodType } from '@/modules/invitation-recipient/zod/invitation-recipient.zod';

export type InvitationMessageZodType = z.infer<typeof InvitationMessageZodSchema>;

export const InvitationMessageZodSchema = BaseZodSchema.extend({
  content: ZodString,
  invitationId: ZodBigInt,

  recipients: z.any() as z.ZodType<InvitationRecipientZodType[] | null | undefined>,
});
