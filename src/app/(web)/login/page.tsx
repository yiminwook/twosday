import Notfound from "@/app/not-found";
import Client from "./client";

export default function Page() {
  if (!!process.env.NEXT_PUBLIC_VERCEL_URL) {
    // 테스트 환경에서만 접근가능
    Notfound();
  }

  return <Client />;
}
