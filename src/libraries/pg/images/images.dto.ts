import { z } from "zod";
import { zInt } from "..";

export type TImageItemDto = z.infer<typeof imageItemDto>;
export const imageItemDto = z.object({
  id: z.string(),
  key: z.string(), // R2 key

  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),

  userId: z.number(),
});

export type TCreateImageDto = z.infer<typeof createImageDto>;
export const createImageDto = z.object({
  key: z.string(),
  userId: z.number(),
});

export type TGetImagesDto = z.infer<typeof getImagesDto>;
export const getImagesDto = z.object({
  userId: z.number().nullish().default(null),
  page: z.preprocess((s) => Number(s), zInt),
  size: z.preprocess((s) => Number(s), zInt),
});
