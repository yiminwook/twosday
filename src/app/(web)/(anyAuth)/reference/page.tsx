import { getWasUrl } from "@/app/_lib/getWasUrl";
import RefList from "@web/_component/refCard/RefList";
import Link from "next/link";
import { Reference } from "./_lib/ref.type";
import Nav from "./_component/Nav";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const response = await fetch(`${getWasUrl()}/api/twosday/reference?page=${page}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const body: {
    data: { reference: Reference[]; total: number; length: number };
    message: string[];
  } = await response.json();

  if (!response.ok) {
    throw new Error(body.message[0]);
  }

  return (
    <div>
      <Nav />
      <div>
        <RefList references={body.data.reference} />
      </div>
      <div>
        <span>PAGE</span>
        {/* TODO: 페이지네이션 */}
        <div>
          <Link href="/reference?page=1">1</Link>
          <Link href="/reference?page=2">2</Link>
          <Link href="/reference?page=3">3</Link>
          <Link href="/reference?page=4">4</Link>
          <Link href="/reference?page=5">5</Link>
        </div>
      </div>
    </div>
  );
}

export const fetchCache = "default-no-store";
