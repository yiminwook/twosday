import { z } from "zod";
import { zInt } from "..";

const parentId = z
  .string()
  .nullish()
  .transform((val, ctx) => {
    if (val === null) return null;

    const num = Number(val);
    if (isNaN(num) || num < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "유효하지 않은 parentId입니다.",
      });

      return z.NEVER;
    }

    return num;
  });

export type TPostCategoryDto = z.infer<typeof postCategoryDto>;
export const postCategoryDto = z.object({
  parentId,
  name: z.string().min(1).max(80), // 3바이트 기준 80자
});

export type TPutCategoryDto = z.infer<typeof putCategoryDto>;
export const putCategoryDto = z.object({
  id: z.preprocess((s) => Number(s), zInt),
  parentId,
  name: z.string().min(1).max(80), // 3바이트 기준 80자
});
