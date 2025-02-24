import { z } from "zod";
import { zInt } from "..";

export type TReferenceItemDto = z.infer<typeof referenceItemDto>;
export const referenceItemDto = z.object({
  id: zInt,
  url: z.string(), // UNIQUE
  thumbnail: z.string(),
  title: z.string(),
  description: z.string(),

  createAt: z.date(),
  updateAt: z.date(),
  deleteAt: z.date().nullable(),
});

export type TReference = {
  id: number;
  url: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  updateAt: string;
};

export type TCreateReferenceDto = z.infer<typeof createReferenceDto>;
export const createReferenceDto = z.object({
  url: z.string(),
  thumbnail: z.string(),
  title: z.string(),
  description: z.string(),
});

export type TGetReferencesDto = z.infer<typeof getReferencesDto>;
export const getReferencesDto = z.object({
  page: z.preprocess((s) => Number(s), zInt),
  size: z.preprocess((s) => Number(s), zInt),
});
