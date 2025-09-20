import { ApiProperty } from '@nestjs/swagger';

export class BaseMessageResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Boolean })
  status: boolean;

  constructor(message: string, status: boolean = true) {
    this.message = message;
    this.status = status;
  }
}
