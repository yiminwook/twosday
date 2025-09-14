import { notFound } from "next/navigation";
import { TGetPostResponse } from "@/libraries/pg/posts/posts.type";
import { serverApi } from "@/apis/fetcher";
import { CATEGORY_TAG, POST_TAG, TAG_TAG, USER_TAG } from "@/constants";
import PostHome from "@/components/post/post-home";

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

  return <PostHome post={postJson.data} />;
}
