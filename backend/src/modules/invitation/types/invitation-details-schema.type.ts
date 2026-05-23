import type { Invitation, Prisma } from '@prisma/client';

import { invitationDetailsInclude } from '@/modules/invitation/types/invitation-details.include';

type InvitationDetailsPayload = Prisma.InvitationGetPayload<{
  include: typeof invitationDetailsInclude;
}>;

export type InvitationDetailsSchema = Invitation &
  Partial<Pick<InvitationDetailsPayload, 'creator' | 'messages' | 'recipients'>>;
