import { notFound } from "next/navigation";
import css from "./page.module.scss";
import { TSelectPost } from "@/libraries/pg/posts/posts.type";
import Viewer from "@/components/editor/Viewer";
import { DisqusComment } from "@/components/Comment";
import { MediaKakaoAdfit } from "@/components/adBanner/KakaoAdfit";
import AdBanner from "@/components/adBanner/AdBanner";
import dayjs from "@/libraries/dayjs";

type Author = {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  email: string;
  nickname: string;
  avartar: string | null;
};

type Tag = string[];

type Post = {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  title: string;
  thumbnail: string | null;
  content: string;
  isPublic: boolean;
  viewCount: number;
  author: Author;
  tags: Tag;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json: { data: TSelectPost; message: string } = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    throw new Error(json.message);
  }

  return (
    <div className={css.wrap}>
      <div className={css.viewerBox}>
        <div className={css.header}>
          <h2 className={css.title}>{json.data.title}</h2>
          <div className={css.info}>
            <div className={css.author}>
              <p>
                <span>작성자: </span>
                <span>{json.data.authorId}</span>
              </p>

              <span>{json.data.isPublic ? "공개" : "비공개"}</span>

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
        <MediaKakaoAdfit />
      </div>

      <div className={css.commentBox}>
        <DisqusComment
          url={`https://twosday.live/posts/${params.id}`}
          title={`post-${params.id}의 댓글`}
          identifier={`post-${params.id}`}
        />
      </div>

      <div className={css.coupangBox}>
        <AdBanner />
      </div>
    </div>
  );
}
