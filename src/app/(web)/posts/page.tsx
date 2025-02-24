import List from "@/components/editor/List";
import Link from "next/link";

interface PostProps {
  searchParams: {
    page?: string;
    order?: "popular";
  };
}
export default async function Page({ searchParams }: PostProps) {
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const urlSearchParams = new URLSearchParams({
    page: page.toString(),
    size: "10",
    order: searchParams.order === "popular" ? "popular" : "recent",
  });

  // const response = await fetch(`${getWasUrl()}/api/twosday/post?${urlSearchParams.toString()}`, {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  //   // next: { revalidate: 300, tags: ["home", "post"] }, //1분 간격으로 캐시 갱신
  // });

  // const body: {
  //   data: { post: Post[]; total: number; size: number };
  //   message: string[];
  // } = await response.json();

  // if (!response.ok) {
  //   throw new Error(body.message[0]);
  // }

  return (
    <div>
      <h1 className="blind">조회 페이지</h1>
      <div>
        <Link
          href={`/posts?order=${
            searchParams.order === "popular" ? "recent" : "popular"
          }&page=${page}`}
        >
          {searchParams.order === "popular" ? "최근순" : "인기순"}
        </Link>
      </div>
      <div>
        <List post={[]} currentPage={page} total={0} size={0} order={searchParams.order} />
      </div>
    </div>
  );
}
