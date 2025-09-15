import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('invitation-messages')
@Controller('invitation-message')
export class InvitationMessageController {}
