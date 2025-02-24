import { putObject } from "@/libraries/cloudflare/r2";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { parse } from "qs";
import { getImagesDto } from "@/libraries/pg/images/images.dto";
import { getImages, postImage } from "@/libraries/pg/images/images.service";

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
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      throw new BadRequestError("image is required");
    }

    const sourceImageBytes = await image.arrayBuffer();
    // const Bytes = new Uint8Array(sourceImageBytes); // Uint8Array<ArrayBufferLike>
    const buffer = Buffer.from(sourceImageBytes);

    const key = uuid() + ".png";

    const r2Result = await putObject(
      process.env.CLOUDFARE_R2_BUCKET_NAME,
      key,
      buffer,
      "image/png",
    );

    const pgResult = await postImage({ key, userId: 6 });

    return NextResponse.json({ messages: "image uploaded", result: r2Result }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
