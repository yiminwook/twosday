import "@/style/highlight.css"; // 코드박스 하이라이트 스타일
import "@/style/editor.css";
import Home from "./home";
import { getServerSession } from "@/app/_lib/getServerSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  console.log("test", session);
  if (!session) return redirect("/login");
  return <Home session={session} />;
}
