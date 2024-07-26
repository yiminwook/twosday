import "@/style/highlight.css"; // 코드박스 하이라이트 스타일
import "@/style/editor.css";
import Home from "./home";
import { getServerSession } from "@/app/_lib/getServerSession";
import { redirect } from "next/navigation";
import { getWasUrl } from "@/app/_lib/getWasUrl";

export default async function Page() {
  const session = await getServerSession();
  const query = new URLSearchParams({
    redirect: process.env.NEXT_PUBLIC_API_URL + "/upload",
  }).toString();
  if (!session) return redirect(`${getWasUrl()}/login?${query}`);
  return <Home session={session} />;
}
