import { ApiProperty } from '@nestjs/swagger';

import { BaseModelResponseDto } from '@/common/base/base-model.response';
import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { HallStatus } from '@/modules/hall/enum/general.enum';
import { UserResponse } from '@/modules/user/dto/response/model/user.response';

export class HallRespnse extends BaseModelResponseDto {
  @ApiProperty({
    description: 'Name of the hall',
    example: 'Grand Ballroom',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the hall',
    example: 'A beautiful venue for weddings and events',
  })
  description: string;

  @ApiProperty({
    description: 'Physical address of the hall',
    example: '123 Main St, City, State 12345',
  })
  address: string;

  @ApiProperty({
    description: 'Contact email for the hall',
    example: 'contact@grandballroom.com',
  })
  email: string;

  @ApiProperty({
    description: 'Contact phone number for the hall',
    example: '+1-555-123-4567',
  })
  phone: string;

  @ApiProperty({
    description: 'Current status of the hall',
    enum: HallStatus,
    example: HallStatus.ACTIVE,
  })
  status: HallStatus;

  @ApiProperty({
    description: 'ID of the hall owner',
    example: '1234567890123456789',
    type: 'string',
  })
  ownerId: number;

  @ApiProperty({
    description: 'Current balance of the hall',
    example: '50000',
    type: 'string',
  })
  balance: number;

  @ApiProperty({
    description: 'Hall owner information',
    type: () => UserResponse,
    required: false,
  })
  owner?: UserResponse;

  @ApiProperty({
    description: 'List of hall employees',
    type: () => [UserResponse],
    required: false,
  })
  employees?: UserResponse[];

  constructor(data: HallEntity) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.address = data.address;
    this.email = data.email;
    this.phone = data.phone;
    this.status = data.status;
    this.ownerId = data.ownerId;
    this.balance = data.balance;

    this.owner = data.owner ? new UserResponse(data.owner) : undefined;
    this.employees = data.employees
      ? data.employees.map((employee) => new UserResponse(employee))
      : undefined;
  }
}
