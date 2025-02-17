import { getServerSession } from "@/apis/getServerSession";
import { getWasUrl } from "@/utils/getWasUrl";
import RefList from "@/components/refCard/RefList";
import Nav from "@/components/reference/Nav";
import { Reference } from "@/types/ref";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;
  const session = await getServerSession();

  // const response = await fetch(`${getWasUrl()}/api/twosday/reference?page=${page}&size=10`, {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  //   // next: { revalidate: 300, tags: ["reference"] }, //5분 간격으로 캐시 갱신
  // });

  // const body: {
  //   data: { reference: Reference[]; total: number; size: number };
  //   message: string[];
  // } = await response.json();

  // if (!response.ok) {
  //   throw new Error(body.message[0]);
  // }

  return (
    <div>
      <Nav session={session} />
      <div>
        <RefList references={[]} currentPage={page} total={0} size={0} />
      </div>
    </div>
  );
}
