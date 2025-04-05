import PostList from "@/components/PostList";
import Link from "next/link";
import css from "./page.module.scss";
import { POSTS_PAGE_SIZE } from "@/constances";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";

interface PostProps {
  searchParams: Promise<{
    page?: string;
    order?: "popular";
  }>;
}

export default async function Page(props: PostProps) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const urlSearchParams = new URLSearchParams({
    page: page.toString(),
    size: POSTS_PAGE_SIZE.toString(),
    order: searchParams.order === "popular" ? "popular" : "recent",
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts?${urlSearchParams.toString()}`,
  );

  const body: {
    data: { list: TPublicPost[]; total: number };
    message: string;
  } = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

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
          <PostList
            posts={body.data.list}
            currentPage={page}
            total={Math.ceil(body.data.total / POSTS_PAGE_SIZE)}
            order={searchParams.order}
          />
        </div>
      </div>
    </div>
  );
}
