import { Client } from 'whatsapp-web.js';

export interface WhatsAppClientSession {
  client: Client;
  hallId: number;
  sessionId: string;
  isReady: boolean;
}
