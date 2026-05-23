import type { InvitationMessage, Prisma } from '@prisma/client';

import { invitationMessageDetailsInclude } from '@/modules/invitation-message/types/invitation-message-details.include';

type InvitationMessageDetailsPayload = Prisma.InvitationMessageGetPayload<{
  include: typeof invitationMessageDetailsInclude;
}>;

export type InvitationMessageDetailsSchema = InvitationMessage &
  Partial<Pick<InvitationMessageDetailsPayload, 'recipients'>>;
