export const sendDiscode = async (message: string, mention?: string) => {
  const content = mention ? `${mention} ${message}` : message;

  const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    console.error("디스코드 웹훅 전송 실패");
    // console.error(await res.text());
  }
};
