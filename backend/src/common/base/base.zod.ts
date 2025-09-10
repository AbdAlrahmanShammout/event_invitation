import { z } from 'zod';

export const ZodNumber = z.number();
export const ZodString = z.string();
export const ZodBoolean = z.boolean();
export const ZodDate = z.date();
export const ZodJson = z.any();

export const ZodNumberNullable = z.number().nullish();
export const ZodStringNullable = z.string().nullish();
export const ZodBooleanNullable = z.boolean().nullish();
export const ZodDateNullable = z.date().nullish();
export const ZodJsonNullable = z.any().nullable();

export type BaseZodType = z.infer<typeof BaseZodSchema>;

export const BaseZodSchema = z.object({
  id: ZodStringNullable,
  createdAt: ZodDateNullable,
  updatedAt: ZodDateNullable,
  deletedAt: ZodDateNullable,
});
