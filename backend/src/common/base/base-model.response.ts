import { BaseEntity } from '@/common/base/base.entity';

export class BaseModelResponseDto {
  id: bigint;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(entity: BaseEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
