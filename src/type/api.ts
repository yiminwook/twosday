export type Post = {
  id: number;
  title: string;
  thumbnail: string | null;
  updatedAt: string;
  createdAt: string;
  author: {
    nickname: string;
    email: string;
    avatar: string | null;
  };
  tags: { id: number; name: string }[];
};
