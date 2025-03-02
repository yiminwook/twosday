import { BadRequestError } from "@/libraries/error";
import { zInt } from "@/libraries/pg";
import { getPostById } from "@/libraries/pg/posts/posts.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const dto = z.preprocess((s) => Number(s), zInt).safeParse(params.id);

  if (dto.error) {
    throw new BadRequestError(dto.error.errors[0].message);
  }

  const data = await getPostById(dto.data);

  return NextResponse.json({ message: "GET /api/v1/posts/%5Bid%5D", data });
}
