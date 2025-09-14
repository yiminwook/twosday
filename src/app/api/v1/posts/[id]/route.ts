import { checkBearerAuth } from "@/libraries/auth/jwt.service";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { zInt } from "@/libraries/pg";
import { createPostDto } from "@/libraries/pg/posts/posts.dto";
import { getPostById, patchPost } from "@/libraries/pg/posts/posts.service";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const dto = z.preprocess((s) => Number(s), zInt).safeParse(params.id);

    if (dto.error) {
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await getPostById(dto.data, "TRUE");

    return NextResponse.json({ message: `${params.id} 포스트 조회성공`, data });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function PATCH(response: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const header = await headers();
    const params = await props.params;

    const postId = Number(params.id);
    const payload = checkBearerAuth(header.get("Authorization"));
    const body = await response.json();

    const dto = createPostDto.safeParse(body);

    if (dto.error) {
      console.error(dto.error);
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await patchPost(payload.id, postId, dto.data);
    return NextResponse.json({ message: "성공적으로 글이 수정되었습니다.", data: { id: postId } });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {}
