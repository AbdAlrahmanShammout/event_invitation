import { MobileRecipientDto } from '@/modules/invitation/dto/request/add-recipients-request.dto';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { MessageStatus } from '@/modules/invitation-recipient/enum/general.enum';

export type CreateMobileRecipientsInput = {
  invitationId: number;
  recipients: MobileRecipientDto[];
};

export type FindRecipientsInput = {
  invitationId?: number;
  hallId?: number;
  messageStatus?: MessageStatus;
  sentAtFrom?: Date;
  sentAtTo?: Date;
  sendAtFrom?: Date;
  sendAtTo?: Date;
  limit?: number;
  offset?: number;
};

export type DeliverySummary = {
  holding: number;
  pending: number;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  total: number;
};

export abstract class InvitationRecipientRepository {
  abstract createRecipients(input: CreateMobileRecipientsInput): Promise<void>;

  abstract findRecipientsByInvitation(invitationId: number): Promise<InvitationRecipientEntity[]>;

  abstract findRecipients(input: FindRecipientsInput): Promise<InvitationRecipientEntity[]>;

  abstract getDeliverySummary(invitationId: number): Promise<DeliverySummary>;

  abstract getRecipientsCountByInvitation(invitationId: number): Promise<number>;

  abstract findExistingPhoneNumbers(
    invitationId: number,
    phoneNumbers: string[],
  ): Promise<string[]>;

  abstract updateRecipientStatus(recipientId: number, status: MessageStatus): Promise<void>;

  abstract updateRecipient(
    recipientId: number,
    data: {
      name?: string;
      phoneNumber?: string;
      notes?: string;
      sentAt?: Date;
    },
  ): Promise<InvitationRecipientEntity>;

  abstract deleteRecipient(recipientId: number): Promise<void>;

  abstract linkRecipientsToMessage(input: {
    messageId: number;
    recipientIds: number[];
  }): Promise<void>;
}
