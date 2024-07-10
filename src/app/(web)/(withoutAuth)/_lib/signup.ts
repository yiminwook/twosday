import { getWasUrl } from "@/app/_lib/getWasUrl";
import { redirect } from "next/dist/server/api-utils";

export const emailSignupFn = async ({
  email,
}: // password,
// nickname,
{
  email: string;
  // password: string;
  // nickname: string;
}) => {
  const trimmedEmail = email.trim();
  // const trimmedPassword = password.trim();
  // const trimmedNickname = nickname.trim();

  if (!trimmedEmail) {
    throw new Error("이메일을 입력해주세요.");
  }

  // if (!trimmedPassword) {
  //   throw new Error("비밀번호를 입력해주세요.");
  // }

  // if (!trimmedNickname) {
  //   throw new Error("닉네임을 입력해주세요.");
  // }

  document.cookie = "redirect=" + encodeURIComponent(process.env.NEXT_PUBLIC_API_URL);

  const res = await fetch(`${getWasUrl()}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: trimmedEmail,
      nickname: trimmedEmail.split("@")[0],
    }),
    credentials: "include",
  });

  const body: { token: string; message: string } = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body;
};
