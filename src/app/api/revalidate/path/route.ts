import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("name");
  if (!path) {
    return NextResponse.json({ message: "Path가 없습니다." }, { status: 400 });
  }
  revalidatePath(path);
  return NextResponse.json({
    message: `${path} 경로가 갱신 되었습니다.`,
    data: { now: Date.now() },
  });
}
