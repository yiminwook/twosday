const emailLoginFn = async ({ email, password }: { email: string; password: string }) => {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail) {
    throw new Error("이메일을 입력해주세요.");
  }

  if (!trimmedPassword) {
    throw new Error("비밀번호를 입력해주세요.");
  }

  const res = await fetch("/was/auth/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
    credentials: "include",
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message);
  }

  return body;
};

export default emailLoginFn;
