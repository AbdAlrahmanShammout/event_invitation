import { HallEntity } from '@/modules/hall/entity/hall.entity';
import { CreateHallRepoInput } from '@/modules/hall/defs/hall-repository.defs';

export abstract class HallRepository {
  abstract create(entity: CreateHallRepoInput): Promise<HallEntity>;
}
