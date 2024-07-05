import { cookies } from "next/headers";

export const getServerSession = async (): Promise<Session | null> => {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) return null;
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/was/auth/session", {
    method: "GET",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  const body = await res.json();

  if (!res.ok) throw new Error(body.message);

  return body;
};
