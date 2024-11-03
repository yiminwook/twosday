import { cookies } from "next/headers";
import { getWasUrl } from "@/utils/getWasUrl";

export const getServerSession = async (): Promise<Session | null> => {
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) return null;

  const res = await fetch(`${getWasUrl()}/api/auth/session`, {
    method: "GET",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  const body: { data: { session: Session }; message: string[] } = await res.json();

  if (!res.ok) throw new Error(body.message[0]);

  return body.data.session;
};
