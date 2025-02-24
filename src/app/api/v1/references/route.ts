import { parseMetadata } from "@/libraries/dompurify/parseMetadata";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import {
  createReferenceDto,
  getReferencesDto,
  TReference,
} from "@/libraries/pg/references/references.dto";
import { getReferences, postReference } from "@/libraries/pg/references/references.service";
import { getYoutubeInfoByVId } from "@/libraries/youtube/youtube.service";
import { extractYoutubeVId } from "@/libraries/youtube/youtube.util";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "qs";

// GET /api/v1/references?size=10&page=1
export async function GET(req: NextRequest) {
  try {
    const queryString = req.nextUrl.searchParams.toString();
    const searchParams = parse(queryString);
    const dto = getReferencesDto.safeParse(searchParams);

    if (dto.error) {
      console.error(dto.error);
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await getReferences(dto.data);

    return NextResponse.json<{
      message: string;
      data: { list: TReference[]; total: number };
    }>({ message: "레퍼런스 목록이 검색 되었습니다.", data });
  } catch (error) {
    console.error(error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url }: { url: unknown } = await req.json();

    if (typeof url !== "string" || url.trim() === "") {
      throw new BadRequestError("url이 존재하지 않습니다.");
    }

    const vid = extractYoutubeVId(url);

    let info: {
      url: string;
      title: string;
      thumbnail: string;
      description: string;
    };

    if (vid) {
      info = await getYoutubeInfoByVId(vid);
    } else {
      info = await fetch(url)
        .then((res) => res.text())
        .then((text) => ({ ...parseMetadata(text), url }));
    }

    const dto = createReferenceDto.safeParse({
      ...info,
      userId: 6,
    });

    if (dto.error) {
      console.error(dto.error);
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await postReference(dto.data);

    return NextResponse.json({ message: "레퍼런스가 생성되었습니다.", data }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
