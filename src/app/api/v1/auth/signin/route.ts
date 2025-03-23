import { signInService } from "@/libraries/auth/auth.service";
import { REFRESH_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from "@/libraries/auth/config";
import { checkBasicAuth, generateRefreshToken } from "@/libraries/auth/jwt.service";
import { serverErrorHandler } from "@/libraries/error";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  try {
    const isSecure = req.nextUrl.protocol === "https:";
    const { email, password } = checkBasicAuth(req.headers.get("authorization"));
    const signinData = await signInService(email, password);

    const payload: JWT = {
      ...signinData,
      loginAt: new Date(),
      iss: new Date(),
    };

    const newRefreshToken = generateRefreshToken(payload);

    cookieStore.set(REFRESH_COOKIE_NAME, newRefreshToken, {
      maxAge: REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
    });

    return NextResponse.json({ message: "Signin success" });
  } catch (error) {
    console.error(error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
