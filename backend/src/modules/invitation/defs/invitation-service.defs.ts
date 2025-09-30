export type CreateInvitationServiceInput = {
  title: string;
  description?: string;
  eventDate: Date;
  maxGuestsAllowed: number;
  hallId: number;
  creatorId: number;
};

export type UpdateInvitationServiceInput = {
  id: number;
  title?: string;
  description?: string;
  eventDate?: Date;
  startSendAt?: Date;
  userHallId?: number;
};

import { InvitationStatus } from '@/modules/invitation/enum/general.enum';

export type GetInvitationServiceInput = {
  id: number;
  includeCreator?: boolean;
  includeMessages?: boolean;
  includeRecipients?: boolean;
  userHallId?: number;
};

export type GetInvitationsServiceInput = {
  hallId: number;
  creatorId?: number;
  status?: InvitationStatus;
  eventDateFrom?: Date;
  eventDateTo?: Date;
  includeCreator?: boolean;
  includeMessages?: boolean;
  includeRecipients?: boolean;
  limit?: number;
  offset?: number;
};
