import { REFRESH_COOKIE_NAME } from "@/libraries/auth/config";
import { serverErrorHandler } from "@/libraries/error";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  try {
    cookieStore.delete(REFRESH_COOKIE_NAME);

    return NextResponse.json({ message: "Signout success" });
  } catch (error) {
    console.error(error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message: message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
