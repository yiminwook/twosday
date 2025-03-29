import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { PostTagDto } from "@/libraries/pg/tags/tags.dto";
import { getTags, postTag } from "@/libraries/pg/tags/tags.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await getTags();
    return NextResponse.json({ message: "태그리스트를 조회했습니다.", data });
  } catch (error) {
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const dto = PostTagDto.safeParse(body);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await postTag(dto.data);
    return NextResponse.json({ message: "태그가 생성되었습니다.", data }, { status: 201 });
  } catch (error) {
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
