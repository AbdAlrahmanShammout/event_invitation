import { z } from 'zod';

import {
  BaseZodSchema,
  ZodDate,
  ZodDateNullable,
  ZodNumber,
  ZodString,
  ZodStringNullable,
} from '@/common/base/base.zod';
import { InvitationStatus } from '@/modules/invitation/enum/general.enum';
import { InvitationMessageZodType } from '@/modules/invitation-message/zod/invitation-message.zod';
import { InvitationRecipientZodType } from '@/modules/invitation-recipient/zod/invitation-recipient.zod';
import { UserZodType } from '@/modules/user/zod/user.zod';

export type InvitationZodType = z.infer<typeof InvitationZodSchema>;

export const InvitationZodSchema = BaseZodSchema.extend({
  title: ZodString,
  description: ZodStringNullable,
  eventDate: ZodDate,
  maxGuestsAllowed: ZodNumber,
  hallId: ZodNumber,
  creatorId: ZodNumber,
  status: z.nativeEnum(InvitationStatus).default(InvitationStatus.DRAFT),
  startSendAt: ZodDateNullable,

  creator: (z.any() as z.ZodType<UserZodType | null | undefined>).optional(),
  messages: (z.any() as z.ZodType<InvitationMessageZodType[] | null | undefined>).optional(),
  recipients: (z.any() as z.ZodType<InvitationRecipientZodType[] | null | undefined>).optional(),
});
