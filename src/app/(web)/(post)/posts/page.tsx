import PostList from "@/components/post-list";
import Link from "next/link";
import css from "./page.module.scss";
import { CATEGORY_TAG, POST_TAG, POSTS_PAGE_SIZE, TAG_TAG, USER_TAG } from "@/constants";
import { TGetPostsResponse } from "@/libraries/pg/posts/posts.type";
import { serverApi } from "@/apis/fetcher";

type Props = {
  searchParams: Promise<{
    page?: string;
    order?: "popular";
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const urlSearchParams = new URLSearchParams({
    page: page.toString(),
    size: POSTS_PAGE_SIZE.toString(),
    order: searchParams.order === "popular" ? "popular" : "recent",
  });

  const postJson = await serverApi
    .get<TGetPostsResponse>(`posts?${urlSearchParams.toString()}`, {
      next: { revalidate: 300, tags: [POST_TAG, TAG_TAG, CATEGORY_TAG, USER_TAG] },
    })
    .json();

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
            posts={postJson.data.list}
            currentPage={page}
            total={Math.ceil(postJson.data.total / POSTS_PAGE_SIZE)}
            order={searchParams.order}
          />
        </div>
      </div>
    </div>
  );
}
