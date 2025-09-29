import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WhatsappSessionService } from './whatsapp-session.service';
import {
  SendMessageServiceInput,
  SendBulkMessagesServiceInput,
  SendMediaMessageServiceInput,
} from './defs/whatsapp-session-service.defs';

@ApiTags('WhatsApp')
@Controller('whatsapp-session')
export class WhatsappSessionController {
  constructor(private readonly whatsappService: WhatsappSessionService) {}

  @Post('halls/:hallId/initialize')
  @ApiOperation({ summary: 'Initialize WhatsApp session for a hall' })
  @ApiResponse({ status: 200, description: 'Session initialized successfully' })
  async initializeHallSession(@Param('hallId', ParseIntPipe) hallId: number) {
    await this.whatsappService.initializeHallSession(hallId);
    return { message: 'WhatsApp session initialization started' };
  }

  @Get('halls/:hallId/qr-code')
  @ApiOperation({ summary: 'Get QR code for hall WhatsApp setup' })
  async getHallQrCode(@Param('hallId', ParseIntPipe) hallId: number) {
    const qrCode = await this.whatsappService.getHallQrCode(hallId);
    return { qrCode };
  }

  @Get('halls/:hallId/status')
  @ApiOperation({ summary: 'Get WhatsApp session status for a hall' })
  async getHallSessionStatus(@Param('hallId', ParseIntPipe) hallId: number) {
    const status = this.whatsappService.getHallSessionStatus(hallId);
    return status;
  }

  @Post('halls/:hallId/send-message')
  @ApiOperation({ summary: 'Send single WhatsApp message from hall account' })
  async sendMessage(
    @Param('hallId', ParseIntPipe) hallId: number,
    @Body() body: { phoneNumber: string; message: string },
  ) {
    const success = await this.whatsappService.sendMessage({
      hallId,
      phoneNumber: body.phoneNumber,
      message: body.message,
    });

    return { success, message: success ? 'Message sent successfully' : 'Failed to send message' };
  }

  @Post('halls/:hallId/send-media-message')
  @ApiOperation({ summary: 'Send media WhatsApp message from hall account' })
  async sendMediaMessage(
    @Param('hallId', ParseIntPipe) hallId: number,
    @Body() body: { phoneNumber: string; mediaPath: string; caption?: string },
  ) {
    const success = await this.whatsappService.sendMediaMessage({
      hallId,
      phoneNumber: body.phoneNumber,
      mediaPath: body.mediaPath,
      caption: body.caption,
    });

    return {
      success,
      message: success ? 'Media message sent successfully' : 'Failed to send media message',
    };
  }

  @Post('halls/:hallId/send-bulk-messages')
  @ApiOperation({ summary: 'Send bulk WhatsApp messages from hall account' })
  async sendBulkMessages(
    @Param('hallId', ParseIntPipe) hallId: number,
    @Body()
    body: { recipients: Array<{ phoneNumber: string; message: string; recipientName?: string }> },
  ) {
    await this.whatsappService.sendBulkMessages({
      hallId,
      recipients: body.recipients,
    });

    return { message: 'Bulk messages processing started' };
  }

  @Post('halls/:hallId/restart')
  @ApiOperation({ summary: 'Restart WhatsApp session for a hall' })
  async restartHallSession(@Param('hallId', ParseIntPipe) hallId: number) {
    await this.whatsappService.restartHallSession(hallId);
    return { message: 'WhatsApp session restarted' };
  }
}
