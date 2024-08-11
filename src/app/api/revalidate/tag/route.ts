import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("name");
  if (!tag) {
    return NextResponse.json({ message: ["Tag가 없습니다."] }, { status: 400 });
  }
  revalidateTag(tag);
  return NextResponse.json({
    message: [`${tag} 태그가 갱신되었습니다.`],
    data: { now: Date.now() },
  });
}
