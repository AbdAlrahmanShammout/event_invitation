import { BaseEntity } from '@/common/base/base.entity';
import { WhatsAppSessionZodType } from '@/modules/whatsapp-session/zod/whatsapp-session.zod';
import { HallEntity } from '@/modules/hall/entity/hall.entity';

export class WhatsAppSessionEntity extends BaseEntity {
  hallId: number;
  sessionId: string;
  isActive: boolean;
  qrCode?: string;
  phoneNumber?: string;
  lastSeen?: Date;

  constructor(data: WhatsAppSessionZodType) {
    super();
    Object.assign(this, data);
  }
}
