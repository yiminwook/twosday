import { NotFoundError, serverErrorHandler } from "@/libraries/error";
import { getImageByKey } from "@/libraries/pg/images/images.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, props: { params: Promise<{ key: string }> }) {
  try {
    const params = await props.params;
    const data = await getImageByKey(params.key);

    if (!data) {
      throw new NotFoundError("리소스를 찾을 수 없습니다.");
    }

    return NextResponse.json({ message: "이미지가 검색 되었습니다.", data }, { status: 200 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
