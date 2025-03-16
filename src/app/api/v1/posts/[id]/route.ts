import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { zInt } from "@/libraries/pg";
import { getPostById } from "@/libraries/pg/posts/posts.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const dto = z.preprocess((s) => Number(s), zInt).safeParse(params.id);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await getPostById(dto.data);

    return NextResponse.json({ message: `${params.id} 포스트 조회성공`, data });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
