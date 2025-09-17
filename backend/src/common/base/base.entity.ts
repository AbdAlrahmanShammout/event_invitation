// import { ZodDiscriminatedUnion, ZodObject } from 'zod';
// import { ZodEffects } from 'zod/lib/types';

export abstract class BaseEntity {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;

  // protected constructor(entity: T, schema: ZodObject<any>, parse: boolean = true) {
  //   const data = parse ? schema.parse(entity) : entity;
  //   Object.assign(this, data);
  // }
}
