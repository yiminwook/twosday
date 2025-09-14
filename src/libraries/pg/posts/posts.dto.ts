import { z } from "zod";
import { zInt } from "..";

export type TPostItemDto = z.infer<typeof PostItemDto>;
export const PostItemDto = z.object({
  id: zInt,
  authorId: zInt,
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  thumbnail: z.string().optional(),
  isPublic: z.boolean(),
  viewCount: zInt,

  createdAt: z.date(),
  updataAt: z.date(),
  deletedAt: z.date().nullable(),

  // m:n
  tagIds: z.array(z.string()),
  imageIds: z.array(z.string()),
  categoryIds: z.array(z.string()),
});

export type TGetPostsDto = z.infer<typeof getPostsDto>;
export type TPostOrderBy = TGetPostsDto["order"];
export const getPostsDto = z.object({
  order: z.enum(["popular", "recent"]),
  page: z.preprocess((s) => Number(s), zInt),
  size: z.preprocess((s) => Number(s), zInt),
  query: z
    .string()
    .optional()
    .transform((v) => v || ""),
});

export type TCreatePostDto = z.infer<typeof createPostDto>;
export const createPostDto = z.object({
  title: z
    .string()
    .min(1, {
      message: "제목은 1자 이상이어야 합니다.",
    })
    .max(100, {
      message: "제목은 100자 이하여야 합니다.",
    }),
  content: z.string().min(1),
  isPublic: z.boolean(),
  tagIds: z.array(z.number()),
  imageKeys: z.array(z.string()),
  categoryId: z.number().nullable(),
});
