import { InvitationStatus } from '@/modules/invitation/enum/general.enum';

export type CreateInvitationRepoInput = {
  title: string;
  description?: string;
  eventDate: Date;
  maxGuestsAllowed: number;
  hallId: number;
  creatorId: number;
};

export type UpdateInvitationRepoInput = {
  id: number;
  title?: string;
  description?: string;
  eventDate?: Date;
  maxGuestsAllowed?: number;
  startSendAt?: Date;
  status?: InvitationStatus;
};

export type GetInvitationRepoInput = {
  id: number;
  includeCreator?: boolean;
  includeMessages?: boolean;
  includeRecipients?: boolean;
};

export type GetInvitationsRepoInput = {
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
