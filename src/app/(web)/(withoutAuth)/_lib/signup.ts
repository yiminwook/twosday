import { getWasUrl } from "@/app/_lib/getWasUrl";
import { checkEmail, checkPassword } from "@/app/_lib/regexp";

export const emailSignupFn = async ({
  email,
  nickname,
  password,
}: {
  email: string;
  nickname: string;
  password: string;
}) => {
  const trimmedEmail = email.trim();
  const trimmedNickname = nickname.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail) {
    throw new Error("이메일을 입력해주세요.");
  }

  if (checkEmail(trimmedEmail) === false) {
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }

  if (!trimmedNickname) {
    throw new Error("닉네임을 입력해주세요.");
  }

  if (checkPassword(trimmedPassword)) {
    throw new Error("비밀번호를 확인하세요.");
  }

  document.cookie = "redirect=" + encodeURIComponent(process.env.NEXT_PUBLIC_API_URL);

  const res = await fetch(`${getWasUrl()}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: trimmedEmail,
      nickname: trimmedNickname,
      password: trimmedPassword,
    }),
    credentials: "include",
  });

  const body: { token: string; message: string } = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body;
};
