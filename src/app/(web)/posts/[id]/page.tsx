import { notFound } from "next/navigation";
import css from "./page.module.scss";
import Viewer from "@/components/editor/Viewer";
import { DisqusComment } from "@/components/Comment";
import { ResponsiveAdfit } from "@/components/adBanner/Adfit";
import AdBanner from "@/components/adBanner/AdBanner";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";
import ViewObserver from "@/components/post/ViewObserver";
import PostInfo from "@/components/post/PostInfo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${params.id}`);
  const json: { message: string; data: TPublicPost } = await res.json();

  if (!json.data) notFound();

  return (
    <div className={css.wrap}>
      <ViewObserver postId={params.id} />
      <div className={css.viewerBox}>
        <PostInfo
          postId={params.id}
          title={json.data.title}
          authorId={json.data.authorId}
          viewCount={json.data.viewCount}
          createdAt={json.data.createdAt}
          updatedAt={json.data.updatedAt}
        />
        <Viewer content={json.data.content} />
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
