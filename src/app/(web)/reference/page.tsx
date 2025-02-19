import RefList from "@/components/refCard/RefList";
import Nav from "@/components/reference/Nav";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

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
      <Nav session={null} />
      <div>
        <RefList references={[]} currentPage={page} total={0} size={0} />
      </div>
    </div>
  );
}
