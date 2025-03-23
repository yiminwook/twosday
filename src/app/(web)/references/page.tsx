import RefList from "@/components/refCard/RefList";
import Nav from "@/components/reference/Nav";
import { TReference } from "@/libraries/pg/references/references.dto";

const PAGE_SIZE = 10;

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/references?page=${page}&size=${PAGE_SIZE}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300, tags: ["reference"] }, //5분 간격으로 캐시 갱신
    },
  );

  const body: {
    data: { list: TReference[]; total: number };
    message: string;
  } = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return (
    <div>
      <Nav session={null} />
      <div>
        <RefList references={body.data.list} currentPage={page} total={body.data.total} size={10} />
      </div>
    </div>
  );
}
