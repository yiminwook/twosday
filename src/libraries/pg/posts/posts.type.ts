export type TPostListSqlResult = {
  postId: number;
  title: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  email: string;
  nickname: string;
  avatar: string | null;
  categoryId: number;
  categoryName: string;
};

export type TPostImageSqlResult = {
  postId: number;
  imageKey: string;
};

export type TPostTagSqlResult = {
  postId: number;
  tagId: number;
  tagName: string;
};

export type TPostCountSqlResult = {
  count: number;
};

export type TPublicPost = {
  postId: number;
  title: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  email: string;
  nickname: string;
  avatar: string | null;
  imageKeys: string[];
  tags: { id: number; name: string }[];
  category: { id: number; name: string } | null;
};

export type TGetPostsResponse = {
  data: { list: TPublicPost[]; total: number };
  message: string;
};

export type TGetPostResponse = {
  data: TPublicPost;
  message: string;
};
