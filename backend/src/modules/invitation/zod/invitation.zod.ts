import { z } from 'zod';

import {
  BaseZodSchema,
  ZodDate,
  ZodNumber,
  ZodString,
  ZodStringNullable,
} from '@/common/base/base.zod';
import { InvitationMessageZodType } from '@/modules/invitation-message/zod/invitation-message.zod';
import { InvitationRecipientZodType } from '@/modules/invitation-recipient/zod/invitation-recipient.zod';
import { UserZodType } from '@/modules/user/zod/user.zod';

export type InvitationZodType = z.infer<typeof InvitationZodSchema>;

export const InvitationZodSchema = BaseZodSchema.extend({
  title: ZodString,
  description: ZodStringNullable,
  eventDate: ZodDate,
  hallId: ZodNumber,
  creatorId: ZodNumber,

  creator: (z.any() as z.ZodType<UserZodType | null | undefined>).optional(),
  messages: (z.any() as z.ZodType<InvitationMessageZodType[] | null | undefined>).optional(),
  recipients: (z.any() as z.ZodType<InvitationRecipientZodType[] | null | undefined>).optional(),
});
