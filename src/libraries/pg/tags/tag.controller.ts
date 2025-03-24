"use server";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { zInt } from "@/libraries/pg";
import { PostTagDto, PutTagDto, TPostTagDto, TPutTagDto } from "./tags.dto";
import { deleteTag, getTags, postTag, putTag } from "./tags.service";
import { z } from "zod";

export async function getTagsController() {
  try {
    const data = await getTags();
    return { message: "태그리스트를 조회했습니다.", data };
  } catch (error) {
    const { message } = serverErrorHandler(error);
    return { message };
  }
}

export async function postTagController(body: TPostTagDto) {
  try {
    const dto = PostTagDto.safeParse(body);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await postTag(dto.data);
    return { message: "태그가 생성되었습니다.", data };
  } catch (error) {
    const { message } = serverErrorHandler(error);
    return { message };
  }
}

// Admin에서 사용할 API
export async function putTagController(body: TPutTagDto) {
  try {
    const dto = PutTagDto.safeParse(body);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await putTag(dto.data);
    return { message: "태그가 수정되었습니다.", data };
  } catch (error) {
    console.error(error);
    const { message } = serverErrorHandler(error);
    return { message };
  }
}

export async function deleteTagController({ id }: { id: number }) {
  try {
    const dto = z.preprocess((s) => Number(s), zInt).safeParse(id);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await deleteTag(dto.data);
    return { message: "태그가 삭제되었습니다.", data };
  } catch (error) {
    console.error(error);
    const { message } = serverErrorHandler(error);
    return { message };
  }
}
