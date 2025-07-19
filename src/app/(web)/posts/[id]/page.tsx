import { notFound } from "next/navigation";
import css from "./page.module.scss";
import Viewer from "@/components/editor/viewer";
import { DisqusComment } from "@/components/comment";
import { ResponsiveAdfit } from "@/components/ad/adfit";
import AdBanner from "@/components/ad/ad-banner";
import { TGetPostResponse } from "@/libraries/pg/posts/posts.type";
import ViewObserver from "@/components/post/view-observer";
import PostInfo from "@/components/post/post-info";
import { serverApi } from "@/apis/fetcher";
import { CATEGORY_TAG, POST_TAG, TAG_TAG, USER_TAG } from "@/constants";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const postJson = await serverApi
    .get<TGetPostResponse>(`posts/${params.id}`, {
      next: { revalidate: 300, tags: [POST_TAG, USER_TAG, CATEGORY_TAG, TAG_TAG] },
    })
    .json();

  if (!postJson.data) notFound();

  return (
    <div className={css.wrap}>
      <ViewObserver postId={params.id} />
      <div className={css.viewerBox}>
        <PostInfo
          postId={params.id}
          title={postJson.data.title}
          authorId={postJson.data.authorId}
          viewCount={postJson.data.viewCount}
          createdAt={postJson.data.createdAt}
          updatedAt={postJson.data.updatedAt}
        />
        <Viewer content={postJson.data.content} />
      </div>

      <div className={css.adfitBox}>
        <ResponsiveAdfit />
      </div>

      <div className={css.commentBox}>
        <DisqusComment
          url={`https://twosday.live/posts/${params.id}`}
          title={`post-${params.id}의 댓글`}
          identifier={`post-${params.id}`}
        />
      </div>
    </div>
  );
}
