import { putObject } from "@/libraries/cloudflare/r2";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { parse } from "qs";
import { getImagesDto } from "@/libraries/pg/images/images.dto";
import { getImages, postImage } from "@/libraries/pg/images/images.service";
import path from "node:path";
import { ACCEPTED_IMAGE_MIME_TYPES } from "@/constants";
import { checkBearerAuth } from "@/libraries/auth/jwt.service";
import { headers } from "next/headers";

// http://localhost:3000/api/v1/images?size=3&page=1
export async function GET(req: NextRequest) {
  try {
    const queryString = req.nextUrl.searchParams.toString();
    const searchParams = parse(queryString);
    const dto = getImagesDto.safeParse(searchParams);

    if (dto.error) {
      console.error(dto.error);
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await getImages(dto.data);

    return NextResponse.json({ message: "이미지 목록이 검색 되었습니다.", data }, { status: 200 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const header = await headers();
    const payload = checkBearerAuth(header.get("Authorization"));
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      throw new BadRequestError("image is required");
    }
    const extension = path.extname(image.name);
    const memeType = image.type;

    if (!ACCEPTED_IMAGE_MIME_TYPES.includes(memeType)) {
      throw new BadRequestError("지원하지 않는 이미지 형식입니다.");
    }

    const sourceImageBytes = await image.arrayBuffer();

    // const Bytes = new Uint8Array(sourceImageBytes); // Uint8Array<ArrayBufferLike>
    const buffer = Buffer.from(sourceImageBytes);

    const key = uuid() + extension;

    const r2Result = await putObject(process.env.CLOUDFARE_R2_BUCKET_NAME, key, buffer, memeType);

    const pgResult = await postImage({ key, userId: payload.id });

    return NextResponse.json({ messages: "이미지 업로드 성공", key }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
