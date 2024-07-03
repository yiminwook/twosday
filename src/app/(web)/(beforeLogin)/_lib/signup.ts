const emailSignupFn = async ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedNickname = nickname.trim();

  if (!trimmedEmail) {
    throw new Error("이메일을 입력해주세요.");
  }

  if (!trimmedPassword) {
    throw new Error("비밀번호를 입력해주세요.");
  }

  if (!trimmedNickname) {
    throw new Error("닉네임을 입력해주세요.");
  }

  const res = await fetch("/was/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: trimmedEmail,
      password: trimmedPassword,
      nickname: trimmedNickname,
    }),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body;
};

export default emailSignupFn;
