import { Injectable, Logger } from '@nestjs/common';
import { WhatsAppManagerService } from '@/providers/whatsapp/whatsapp-manager.service';
import { WhatsAppSessionRepository } from './repository/whatsapp-session.repository';
import {
  SendMessageServiceInput,
  SendBulkMessagesServiceInput,
  SendMediaMessageServiceInput,
} from './defs/whatsapp-session-service.defs';

@Injectable()
export class WhatsappSessionService {
  private readonly logger = new Logger(WhatsappSessionService.name);

  constructor(
    private readonly whatsappManager: WhatsAppManagerService,
    private readonly whatsappSessionRepository: WhatsAppSessionRepository,
  ) {}

  /**
   * Initialize WhatsApp session for a hall
   */
  async initializeHallSession(hallId: number): Promise<void> {
    const sessionId = `hall_${hallId}`;
    await this.whatsappSessionRepository.create(hallId, sessionId);
    await this.whatsappManager.initializeSession(hallId);
  }

  /**
   * Get QR code for hall WhatsApp setup
   */
  async getHallQrCode(hallId: number): Promise<string | null> {
    return await this.whatsappSessionRepository.getQrCode(hallId);
  }

  /**
   * Send single message from hall's WhatsApp
   */
  async sendMessage(input: SendMessageServiceInput): Promise<boolean> {
    const { hallId, phoneNumber, message } = input;
    return await this.whatsappManager.sendMessage(hallId, phoneNumber, message);
  }

  /**
   * Send media message from hall's WhatsApp
   */
  async sendMediaMessage(input: SendMediaMessageServiceInput): Promise<boolean> {
    const { hallId, phoneNumber, mediaPath, caption } = input;
    return await this.whatsappManager.sendMediaMessage(hallId, phoneNumber, mediaPath, caption);
  }

  /**
   * Send bulk messages from hall's WhatsApp
   */
  async sendBulkMessages(input: SendBulkMessagesServiceInput): Promise<void> {
    const { hallId, recipients } = input;

    const results = await Promise.allSettled(
      recipients.map(async (recipient) => {
        const success = await this.whatsappManager.sendMessage(
          hallId,
          recipient.phoneNumber,
          recipient.message,
        );

        return {
          phoneNumber: recipient.phoneNumber,
          success,
        };
      }),
    );

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const { phoneNumber, success } = result.value;
        if (success) {
          this.logger.log(`Message sent to ${phoneNumber}`);
        } else {
          this.logger.error(`Failed to send message to ${phoneNumber}`);
        }
      } else {
        this.logger.error(
          `Error sending message to ${recipients[index].phoneNumber}:`,
          result.reason,
        );
      }
    });
  }

  /**
   * Get session status for a hall
   */
  getHallSessionStatus(hallId: number) {
    return this.whatsappManager.getSessionStatus(hallId);
  }

  /**
   * Restart session for a hall
   */
  async restartHallSession(hallId: number): Promise<void> {
    await this.whatsappManager.destroySession(hallId);
    await this.initializeHallSession(hallId);
  }
}
