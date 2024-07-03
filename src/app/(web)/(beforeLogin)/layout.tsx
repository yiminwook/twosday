import { getServerSession } from "@/app/_lib/getServerSession";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession();
  if (!session) return redirect("/");
  return <>{children}</>;
}
