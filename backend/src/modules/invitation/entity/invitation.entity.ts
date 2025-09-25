import { BaseEntity } from '@/common/base/base.entity';
import { HallZodType } from '@/modules/hall/zod/hall.zod';
import { InvitationZodType } from '@/modules/invitation/zod/invitation.zod';
import { InvitationMessageEntity } from '@/modules/invitation-message/entity/invitation-message.entity';
import { InvitationRecipientEntity } from '@/modules/invitation-recipient/entity/invitation-recipient.entity';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { SUBMISSION_DEADLINE_DAYS_BEFORE_EVENT } from '@/common/constants/value.constant';

export class InvitationEntity extends BaseEntity {
  title: string;
  description: string;
  eventDate: Date;
  maxGuestsAllowed: number;
  hallId: number;
  creatorId: number;

  submissionDeadline: Date;

  creator?: UserEntity;
  messages?: InvitationMessageEntity[];
  recipients?: InvitationRecipientEntity[];

  constructor(data: InvitationZodType) {
    super();
    Object.assign(this, data);
    this.setSubmissionDeadline();
  }

  setSubmissionDeadline() {
    this.submissionDeadline = new Date(
      this.eventDate.getTime() - SUBMISSION_DEADLINE_DAYS_BEFORE_EVENT * 24 * 60 * 60 * 1000,
    );
  }
}
