import {
  CreateInvitationRepoInput,
  GetInvitationRepoInput,
  GetInvitationsRepoInput,
  UpdateInvitationRepoInput,
} from '@/modules/invitation/defs/invitation-repository.defs';
import { InvitationEntity } from '@/modules/invitation/entity/invitation.entity';

export abstract class InvitationRepository {
  abstract create(input: CreateInvitationRepoInput): Promise<InvitationEntity>;
  abstract getById(input: GetInvitationRepoInput): Promise<InvitationEntity | null>;
  abstract getAll(input: GetInvitationsRepoInput): Promise<InvitationEntity[]>;
  abstract update(input: UpdateInvitationRepoInput): Promise<InvitationEntity>;
  abstract delete(id: number): Promise<void>;
}
