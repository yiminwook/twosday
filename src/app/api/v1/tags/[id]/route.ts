import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { zInt } from "@/libraries/pg";
import { PutTagDto } from "@/libraries/pg/tags/tags.dto";
import { deleteTag, putTag } from "@/libraries/pg/tags/tags.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Admin에서 사용할 API
export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await req.json();
    const dto = PutTagDto.safeParse({ ...body, id: params.id });

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await putTag(dto.data);
    return NextResponse.json({ message: "태그가 수정되었습니다.", data }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const dto = z.preprocess((s) => Number(s), zInt).safeParse(params.id);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await deleteTag(dto.data);
    return NextResponse.json({ message: "태그가 삭제되었습니다.", data });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
