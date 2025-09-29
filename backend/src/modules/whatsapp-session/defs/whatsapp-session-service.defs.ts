export interface SendMessageServiceInput {
  hallId: number;
  phoneNumber: string;
  message: string;
}

export interface SendBulkMessagesServiceInput {
  hallId: number;
  recipients: Array<{
    phoneNumber: string;
    message: string;
    recipientName?: string;
  }>;
}

export interface SendMediaMessageServiceInput {
  hallId: number;
  phoneNumber: string;
  mediaPath: string;
  caption?: string;
}