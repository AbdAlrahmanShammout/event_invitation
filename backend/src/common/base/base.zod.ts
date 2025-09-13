import { z } from 'zod';

export const ZodNumber = z.number();
export const ZodBigInt = z.bigint();
export const ZodString = z.string();
export const ZodBoolean = z.boolean();
export const ZodDate = z.date();
export const ZodJson = z.any();

export const ZodNumberNullable = ZodNumber.nullish();
export const ZodBigIntNullable = ZodBigInt.nullish();
export const ZodStringNullable = ZodString.nullish();
export const ZodBooleanNullable = ZodBoolean.nullish();
export const ZodDateNullable = ZodDate.nullish();
export const ZodJsonNullable = ZodJson.nullable();

export type BaseZodType = z.infer<typeof BaseZodSchema>;

export const BaseZodSchema = z.object({
  id: ZodBigIntNullable,
  createdAt: ZodDateNullable,
  updatedAt: ZodDateNullable,
  deletedAt: ZodDateNullable,
});
