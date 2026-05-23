import type { InvitationRecipient, Prisma } from '@prisma/client';

import { invitationRecipientDetailsInclude } from '@/modules/invitation-recipient/types/invitation-recipient-details.include';

type InvitationRecipientDetailsPayload = Prisma.InvitationRecipientGetPayload<{
  include: typeof invitationRecipientDetailsInclude;
}>;

export type InvitationRecipientDetailsSchema = InvitationRecipient &
  Partial<Pick<InvitationRecipientDetailsPayload, 'invitation' | 'invitationMessage'>>;
