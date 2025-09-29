import { UpdateSessionStatusRepoInput } from '@/modules/whatsapp-session/defs/whatsapp-session-repository.defs';

export abstract class WhatsAppSessionRepository {
  abstract create(hallId: number, sessionId: string): Promise<void>;

  abstract updateQrCode(hallId: number, qrCode: string): Promise<void>;

  abstract updateSessionStatus(hallId: number, data: UpdateSessionStatusRepoInput): Promise<void>;

  abstract getQrCode(hallId: number): Promise<string | null>;

  abstract findByHallId(hallId: number): Promise<any>;

  abstract getActiveSessionsForInitialization(): Promise<{ hallId: number; sessionId: string }[]>;
}
