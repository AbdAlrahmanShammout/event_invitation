import {
  CreateHallRepoInput,
  GetHallsRepoInput,
  UpdateHallRepoInput,
} from '@/modules/hall/defs/hall-repository.defs';
import { HallEntity } from '@/modules/hall/entity/hall.entity';

export abstract class HallRepository {
  abstract create(entity: CreateHallRepoInput): Promise<HallEntity>;
  abstract findById(id: number): Promise<HallEntity | null>;
  abstract findAll(input: GetHallsRepoInput): Promise<HallEntity[]>;
  abstract update(input: UpdateHallRepoInput): Promise<HallEntity>;
}
