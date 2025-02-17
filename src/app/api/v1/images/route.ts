import { putObject } from "@/libraries/cloudflare/r2";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

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

    // console.log()
    const result = await putObject(
      process.env.CLOUDFARE_R2_BUCKET_NAME,
      uuid() + ".png",
      buffer,
      "image/png",
    );
    return NextResponse.json({ messages: "image uploaded", result }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
