import List from "@/components/editor/List";
import { TSelectPost } from "@/libraries/pg/posts/posts.type";
import Link from "next/link";
import css from "./page.module.scss";

interface PostProps {
  searchParams: {
    page?: string;
    order?: "popular";
  };
}

const PAGE_SIZE = 10;

export default async function Page({ searchParams }: PostProps) {
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const urlSearchParams = new URLSearchParams({
    page: page.toString(),
    size: PAGE_SIZE.toString(),
    order: searchParams.order === "popular" ? "popular" : "recent",
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?${urlSearchParams.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300, tags: ["home", "post"] }, //1분 간격으로 캐시 갱신
    },
  );

  const body: {
    data: { list: TSelectPost[]; total: number };
    message: string[];
  } = await response.json();

  return (
    <div className={css.page}>
      <h1 className="blind">조회 페이지</h1>
      <div className={css.navBox}>
        <div></div>
        <Link
          href={`/posts?order=${
            searchParams.order === "popular" ? "recent" : "popular"
          }&page=${page}`}
        >
          {searchParams.order === "popular" ? "최근순" : "인기순"}
        </Link>
      </div>
      <div className={css.listBox}>
        <div>
          <List
            post={body.data.list}
            currentPage={page}
            total={body.data.total}
            size={PAGE_SIZE}
            order={searchParams.order}
          />
        </div>
      </div>
    </div>
  );
}
