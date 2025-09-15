import { BaseModelResponseDto } from '@/common/base/base-model.response';
import { HallStatus } from '@/modules/hall/enum/general.enum';
import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { UserResponse } from '@/modules/user/dto/response/model/user.response';

export class HallRespnse extends BaseModelResponseDto {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  status: HallStatus;
  ownerId: bigint;
  balance: bigint;

  owner?: UserResponse;
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
