import List from "@/components/PostList";
import Link from "next/link";
import css from "./page.module.scss";
import { getPostsDto } from "@/libraries/pg/posts/posts.dto";
import { BadRequestError } from "@/libraries/error";
import { getPosts } from "@/libraries/pg/posts/posts.service";
import { parsePosts } from "@/utils/helper";

interface PostProps {
  searchParams: Promise<{
    page?: string;
    order?: "popular";
  }>;
}

const PAGE_SIZE = 10;

export default async function Page(props: PostProps) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const urlSearchParams = new URLSearchParams({
    page: page.toString(),
    size: PAGE_SIZE.toString(),
    order: searchParams.order === "popular" ? "popular" : "recent",
  });

  const dto = getPostsDto.safeParse({
    page: page.toString(),
    size: PAGE_SIZE.toString(),
    order: searchParams.order === "popular" ? "popular" : "recent",
  });

  if (dto.error) {
    console.error(dto.error);
    throw new BadRequestError(dto.error.errors[0].message);
  }

  const data = await getPosts(dto.data);
  const parsedPosts = parsePosts(data.posts);

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
            posts={parsedPosts}
            currentPage={page}
            total={data.total}
            size={PAGE_SIZE}
            order={searchParams.order}
          />
        </div>
      </div>
    </div>
  );
}
