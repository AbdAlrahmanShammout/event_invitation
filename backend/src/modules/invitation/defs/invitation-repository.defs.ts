export type CreateInvitationRepoInput = {
  title: string;
  description?: string;
  eventDate: Date;
  hallId: number;
  creatorId: number;
};

export type UpdateInvitationRepoInput = {
  id: number;
  title?: string;
  description?: string;
  eventDate?: Date;
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
  includeCreator?: boolean;
  includeMessages?: boolean;
  includeRecipients?: boolean;
  limit?: number;
  offset?: number;
};
