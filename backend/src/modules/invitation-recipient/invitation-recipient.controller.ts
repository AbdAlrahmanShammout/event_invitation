import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('invitation-recipients')
@Controller('invitation-recipient')
export class InvitationRecipientController {}
