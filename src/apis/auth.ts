import { utf8ToBase64 } from "@/utils/textEncode";

export const signInFn = async (arg: { email: string; password: string }) => {
  const res = await fetch("/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + utf8ToBase64(`${arg.email}:${arg.password}`),
    },
  });

  if (!res.ok) {
    const data = (await res.json()) as { message: string };
    throw new Error(data.message || "서비스 접근권한이 없습니다.");
  }

  return true;
};
