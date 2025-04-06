import { serverApi } from "@/apis/fetcher";
import ky from "ky";

export const sendDiscode = async (message: string, mention?: string) => {
  const content = mention ? `${mention} ${message}` : message;

  const res = await ky
    .post(process.env.DISCORD_WEBHOOK_URL, {
      headers: { "Content-Type": "application/json" },
      json: { content },
      fetch: fetch,
    })
    .json();

  return res;
};
