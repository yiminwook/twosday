import { sendDiscode } from "@/libraries/discord";
import { sendVerificationCode } from "@/libraries/mail/mail.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await sendVerificationCode("grs0412@naver.com", "test");
    await sendDiscode("인증 코드를 발송했습니다.", "<@!test>");
    return NextResponse.json({ message: "Hello, World!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" });
  }
}
