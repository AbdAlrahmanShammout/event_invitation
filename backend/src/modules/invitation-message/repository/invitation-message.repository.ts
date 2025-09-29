import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import {
  CreateInvitationMessageRepoInput,
  UpdateInvitationMessageRepoInput,
} from '@/modules/invitation-message/defs/invitation-message-repository.defs';

export abstract class InvitationMessageRepository {
  abstract create(input: CreateInvitationMessageRepoInput): Promise<InvitationMessageEntity>;

  abstract findByInvitationId(invitationId: number): Promise<InvitationMessageEntity[]>;

  abstract getMessagesCountByInvitation(invitationId: number): Promise<number>;

  abstract findById(id: number): Promise<InvitationMessageEntity | null>;

  abstract update(
    id: number,
    input: UpdateInvitationMessageRepoInput,
  ): Promise<InvitationMessageEntity>;

  abstract deleteMessage(id: number): Promise<void>;
}
