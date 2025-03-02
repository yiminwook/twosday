import { z } from "zod";
import { zInt } from "..";

export type TPostTagDto = z.infer<typeof PostTagDto>;
export const PostTagDto = z.object({
  name: z.string().min(1).max(80), // 3바이트 기준 80자까지,
});

export type TPutTagDto = z.infer<typeof PutTagDto>;
export const PutTagDto = z.object({
  id: z.preprocess((s) => Number(s), zInt),
  name: z.string().min(1).max(80), // 3바이트 기준 80자까지,
});
