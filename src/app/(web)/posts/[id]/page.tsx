import { notFound } from "next/navigation";
import css from "./page.module.scss";
import Viewer from "@/components/editor/Viewer";
import { DisqusComment } from "@/components/Comment";
import { MediaKakaoAdfit } from "@/components/adBanner/KakaoAdfit";
import AdBanner from "@/components/adBanner/AdBanner";
import dayjs from "@/libraries/dayjs";
import { z } from "zod";
import { zInt } from "@/libraries/pg";
import { BadRequestError } from "@/libraries/error";
import { getPublicPostById } from "@/libraries/pg/posts/posts.service";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const dto = z.preprocess((s) => Number(s), zInt).safeParse(params.id);

  if (dto.error) {
    throw new BadRequestError(dto.error.errors[0].message);
  }

  const data = await getPublicPostById(dto.data);

  console.log(data);

  if (!data) notFound();

  return (
    <div className={css.wrap}>
      <div className={css.viewerBox}>
        <div className={css.header}>
          <h2 className={css.title}>{data.title}</h2>
          <div className={css.info}>
            <div className={css.author}>
              <p>
                <span>작성자: </span>
                <span>{data.authorId}</span>
              </p>

              <p>
                <span>조회수: </span>
                <span>{data.viewCount}</span>
              </p>
            </div>

            <div>
              <p>
                <span>작성일: </span>
                <time>{dayjs(data.createdAt).format("YYYY년 MM월 DD일")}</time>
              </p>

              <p>
                <span>수정일: </span>
                <time>{dayjs(data.updatedAt).format("YYYY년 MM월 DD일")}</time>
              </p>
            </div>
          </div>
        </div>
        <Viewer content={data.content} />
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
