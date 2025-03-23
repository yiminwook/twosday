export type TSelectPost = {
  id: number;
  authorId: number;
  title: string;
  content: string;
  isPublic: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  nickname: string;
};
