import Home from "@/components/editor/Home";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect(`/signin`);
  // return <Home session={session} />;
}
