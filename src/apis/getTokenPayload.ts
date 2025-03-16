// url token에서 session을 가져오는 함수
export const getSessionByToken = async (token: string) => {
  const res = await fetch(`api/auth/session`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const body: {
    message: string;
    session: Session | null;
  } = await res.json();

  if (!res.ok) throw new Error(body.message);

  return body.session;
};
