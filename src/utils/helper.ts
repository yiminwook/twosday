import { getPureText } from "@/libraries/dompurify";
import { TPost } from "@/libraries/pg/posts/posts.type";

const CONTENT_PREVIEW_STRING_MAX_LENGTH = 200;

export const parsePosts = (rawPosts: TPost[]): TPost[] => {
  return rawPosts.map((raw) => ({
    ...raw,
    content: getPureText(raw.content).slice(0, CONTENT_PREVIEW_STRING_MAX_LENGTH),
  }));
};
