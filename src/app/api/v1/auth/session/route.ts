import { sessionService } from "@/libraries/auth/auth.service";
import { REFRESH_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from "@/libraries/auth/config";
import { generateRefreshToken } from "@/libraries/auth/jwt.service";
import { serverErrorHandler } from "@/libraries/error";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();

  try {
    const url = new URL(req.url);
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME);

    const headers = new Headers(req.headers);
    headers.set("cache-control", "no-store");
    headers.set("pragma", "no-cache");
    headers.set("expires", "0");

    if (!refreshToken) {
      return NextResponse.json({ session: null, message: "세션조회 성공" });
    }

    const { jwt, accessToken } = await sessionService(refreshToken.value);
    const newRefreshToken = generateRefreshToken(jwt);

    cookieStore.set(REFRESH_COOKIE_NAME, newRefreshToken, {
      maxAge: REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
      secure: url.protocol === "https:",
      sameSite: "lax",
    });

    return NextResponse.json({ session, message: "세션조회 성공" }, { headers });
  } catch (error) {
    cookieStore.set(REFRESH_COOKIE_NAME, "", { maxAge: 0 }); // remove refresh token
    console.error(error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ session: null, message: message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
