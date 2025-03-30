import { notFound } from "next/navigation";
import css from "./page.module.scss";
import Viewer from "@/components/editor/Viewer";
import { DisqusComment } from "@/components/Comment";
import { ResponsiveAdfit } from "@/components/adBanner/Adfit";
import AdBanner from "@/components/adBanner/AdBanner";
import dayjs from "@/libraries/dayjs";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";
import ViewObserver from "@/components/post/ViewObserver";

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
        <div className={css.header}>
          <h2 className={css.title}>{json.data.title}</h2>
          <div className={css.info}>
            <div className={css.author}>
              <p>
                <span>작성자: </span>
                <span>{json.data.authorId}</span>
              </p>

              <p>
                <span>조회수: </span>
                <span>{json.data.viewCount}</span>
              </p>
            </div>

            <div>
              <p>
                <span>작성일: </span>
                <time>{dayjs(json.data.createdAt).format("YYYY년 MM월 DD일")}</time>
              </p>

              <p>
                <span>수정일: </span>
                <time>{dayjs(json.data.updatedAt).format("YYYY년 MM월 DD일")}</time>
              </p>
            </div>
          </div>
        </div>
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
