import { getServerSession } from "@/app/_lib/getServerSession";
import { getWasUrl } from "@/app/_lib/getWasUrl";
import RefList from "@web/_component/refCard/RefList";
import Nav from "./_component/Nav";
import { Reference } from "./_lib/ref.type";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;
  const session = await getServerSession();

  const response = await fetch(`${getWasUrl()}/api/twosday/reference?page=${page}&size=10`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // next: { revalidate: 300, tags: ["reference"] }, //5분 간격으로 캐시 갱신
  });

  const body: {
    data: { reference: Reference[]; total: number; size: number };
    message: string[];
  } = await response.json();

  if (!response.ok) {
    throw new Error(body.message[0]);
  }

  return (
    <div>
      <Nav session={session} />
      <div>
        <RefList
          references={body.data.reference}
          currentPage={page}
          total={body.data.total}
          size={body.data.size}
        />
      </div>
    </div>
  );
}
