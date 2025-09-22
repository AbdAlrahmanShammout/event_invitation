export type CreateInvitationServiceInput = {
  title: string;
  description?: string;
  eventDate: Date;
  hallId: number;
  creatorId: number;
};

export type UpdateInvitationServiceInput = {
  id: number;
  title?: string;
  description?: string;
  eventDate?: Date;
  userHallId?: number;
};

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
  includeCreator?: boolean;
  includeMessages?: boolean;
  includeRecipients?: boolean;
  limit?: number;
  offset?: number;
};
