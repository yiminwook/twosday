import Home from "@/components/editor/Home";
import { getServerSession } from "@/apis/getServerSession";
import { redirect } from "next/navigation";
import { getWasUrl } from "@/utils/getWasUrl";

export default async function Page() {
  const session = await getServerSession();
  const query = new URLSearchParams({
    redirect: process.env.NEXT_PUBLIC_API_URL + "/post/edit",
  }).toString();
  if (!session) return redirect(`${getWasUrl()}/login?${query}`);
  return <Home session={session} />;
}
