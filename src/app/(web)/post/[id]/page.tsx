import { getWasUrl } from "@/utils/getWasUrl";
import Viewer from "@/components/editor/Viewer";
import { notFound } from "next/navigation";
import Comment from "@/components/editor/Comment";
import * as css from "./page.css";
import AdBanner from "@/components/adBanner/AdBanner";

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
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // const response = await fetch(`${getWasUrl()}/api/twosday/post/${params.id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const body: { data: Post; message: string[] } = await response.json();

  // if (!response.ok) {
  //   if (response.status === 404) {
  //     notFound();
  //   }
  //   throw new Error(body.message[0]);
  // }

  return (
    <div className={css.wrap}>
      <h1 className="blind">단건 조회 페이지</h1>
      <div className={css.viewerBox}>
        <div className={css.viewerHead}>
          <h2>title</h2>
          <p>createdAt</p>
          <p>updateAt</p>
        </div>
        <Viewer content="" />
      </div>
      <AdBanner />
      <div className={css.commentBox}>
        <Comment />
      </div>
    </div>
  );
}
