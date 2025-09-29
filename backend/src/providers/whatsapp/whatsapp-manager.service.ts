import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { WhatsAppSessionRepository } from '@/modules/whatsapp-session/repository/whatsapp-session.repository';
import { WhatsAppClientSession } from './defs/whatsapp-manager.defs';

@Injectable()
export class WhatsAppManagerService implements OnModuleDestroy {
  private readonly logger = new Logger(WhatsAppManagerService.name);
  private readonly sessions = new Map<number, WhatsAppClientSession>();

  constructor(private readonly whatsappSessionRepository: WhatsAppSessionRepository) {}

  async onModuleDestroy() {
    // Cleanup all sessions when module is destroyed
    for (const [hallId, session] of this.sessions) {
      await this.destroySession(hallId);
    }
  }

  /**
   * Initialize WhatsApp session for a specific hall
   */
  async initializeSession(hallId: number): Promise<void> {
    try {
      if (this.sessions.has(hallId)) {
        this.logger.warn(`Session for hall ${hallId} already exists`);
        return;
      }

      const sessionId = `hall_${hallId}`;

      // Create WhatsApp client with LocalAuth for persistent sessions
      const client = new Client({
        authStrategy: new LocalAuth({
          clientId: sessionId,
          dataPath: `./whatsapp-sessions/${sessionId}`,
        }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
          ],
        },
      });

      const session: WhatsAppClientSession = {
        client,
        hallId,
        sessionId,
        isReady: false,
      };

      this.sessions.set(hallId, session);

      await this.setupClientEvents(session);

      await client.initialize();
    } catch (error) {
      this.logger.error(`Failed to initialize session for hall ${hallId}:`, error);
      throw error;
    }
  }

  /**
   * Setup event handlers for WhatsApp client
   */
  private async setupClientEvents(session: WhatsAppClientSession): Promise<void> {
    const { client, hallId, sessionId } = session;

    client.on('qr', async (qr) => {
      this.logger.log(`QR Code generated for hall ${hallId}`);

      // Display QR code in terminal for development
      qrcode.generate(qr, { small: true });

      // Save QR code to database
      await this.whatsappSessionRepository.updateQrCode(hallId, qr);
    });

    client.on('ready', async () => {
      this.logger.log(`WhatsApp session ready for hall ${hallId}`);
      session.isReady = true;

      const clientInfo = client.info;
      await this.whatsappSessionRepository.updateSessionStatus(hallId, {
        isActive: true,
        phoneNumber: clientInfo?.wid?.user || null,
        qrCode: null, // Clear QR code once authenticated
        lastSeen: new Date(),
      });
    });

    client.on('authenticated', () => {
      this.logger.log(`WhatsApp authenticated for hall ${hallId}`);
    });

    client.on('auth_failure', async (msg) => {
      this.logger.error(`Authentication failed for hall ${hallId}:`, msg);
      await this.whatsappSessionRepository.updateSessionStatus(hallId, {
        isActive: false,
        qrCode: null,
      });
    });

    client.on('disconnected', async (reason) => {
      this.logger.warn(`WhatsApp disconnected for hall ${hallId}:`, reason);
      session.isReady = false;

      await this.whatsappSessionRepository.updateSessionStatus(hallId, {
        isActive: false,
        lastSeen: new Date(),
      });
    });

    client.on('message', async (message) => {
      // Handle incoming messages if needed
      this.logger.debug(`Received message for hall ${hallId}: ${message.body}`);
    });
  }

  /**
   * Send message from specific hall's WhatsApp account
   */
  async sendMessage(hallId: number, phoneNumber: string, message: string): Promise<boolean> {
    try {
      const session = this.sessions.get(hallId);

      if (!session) {
        throw new Error(`No WhatsApp session found for hall ${hallId}`);
      }

      if (!session.isReady) {
        throw new Error(`WhatsApp session for hall ${hallId} is not ready`);
      }

      // Format phone number (ensure it includes country code)
      const formattedNumber = this.formatPhoneNumber(phoneNumber);

      await session.client.sendMessage(formattedNumber, message);

      this.logger.log(`Message sent successfully from hall ${hallId} to ${phoneNumber}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send message from hall ${hallId}:`, error);
      return false;
    }
  }

  /**
   * Send media message from specific hall's WhatsApp account
   */
  async sendMediaMessage(
    hallId: number,
    phoneNumber: string,
    mediaPath: string,
    caption?: string,
  ): Promise<boolean> {
    try {
      const session = this.sessions.get(hallId);

      if (!session || !session.isReady) {
        throw new Error(`WhatsApp session for hall ${hallId} is not ready`);
      }

      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      const media = MessageMedia.fromFilePath(mediaPath);

      await session.client.sendMessage(formattedNumber, media, { caption });

      this.logger.log(`Media message sent successfully from hall ${hallId} to ${phoneNumber}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send media message from hall ${hallId}:`, error);
      return false;
    }
  }

  /**
   * Get session status for a hall
   */
  getSessionStatus(hallId: number): { exists: boolean; isReady: boolean } {
    const session = this.sessions.get(hallId);
    return {
      exists: !!session,
      isReady: session?.isReady || false,
    };
  }

  /**
   * Destroy session for a specific hall
   */
  async destroySession(hallId: number): Promise<void> {
    const session = this.sessions.get(hallId);

    if (session) {
      await session.client.destroy();
      this.sessions.delete(hallId);

      await this.whatsappSessionRepository.updateSessionStatus(hallId, {
        isActive: false,
        lastSeen: new Date(),
      });

      this.logger.log(`Session destroyed for hall ${hallId}`);
    }
  }

  /**
   * Format phone number to WhatsApp format
   */
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');

    // Add country code if not present (assuming +1 for demo, adjust as needed)
    if (!cleaned.startsWith('1') && cleaned.length === 10) {
      cleaned = '1' + cleaned;
    }

    return cleaned + '@c.us';
  }
}
