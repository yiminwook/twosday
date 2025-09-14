import { checkBearerAuth } from "@/libraries/auth/jwt.service";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { zInt } from "@/libraries/pg";
import { getAuthorPostById } from "@/libraries/pg/posts/posts.service";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const header = await headers();
    const payload = checkBearerAuth(header.get("Authorization"));

    const params = await props.params;
    const dto = z.preprocess((s) => Number(s), zInt).safeParse(params.id);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await getAuthorPostById(dto.data, payload.id);

    return NextResponse.json({ message: `${params.id} 포스트 조회성공`, data });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
