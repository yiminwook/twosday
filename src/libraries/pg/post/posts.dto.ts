import { z } from "zod";
import { zInt } from "..";

export type TPostItemDto = z.infer<typeof postPostDto>;
export const postPostDto = z.object({
  id: zInt,
  authorId: zInt,
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  isPublic: z.boolean(),
  viewCount: zInt,
  createdAt: z.date(),
  updataAt: z.date(),
  deletedAt: z.date().nullable(),

  // m:n
  tagIds: z.array(z.string()),
  imageIds: z.array(z.string()),
});

export type TGetPostsParamsDto = z.infer<typeof getPostsParamsDto>;
export const getPostsParamsDto = z.object({
  order: z.enum(["popular", "recent"]),
  page: z.preprocess((s) => Number(s), zInt),
  size: z.preprocess((s) => Number(s), zInt),
  query: z
    .string()
    .optional()
    .transform((v) => v || ""),
});
