import { TPost } from "@/libraries/pg/posts/posts.type";
import css from "./post-home.module.scss";
import ViewObserver from "./view-observer";
import PostInfo from "./post-info";
import Viewer from "../editor/viewer";
import { ResponsiveAdfit } from "../ad/adfit";
import { DisqusComment } from "../comment";

interface PostHomeProps {
  post: TPost;
}

export default function PostHome({ post }: PostHomeProps) {
  return (
    <div className={css.wrap}>
      <ViewObserver postId={post.postId} />
      <div className={css.viewerBox}>
        <PostInfo
          postId={post.postId}
          title={post.title}
          authorId={post.authorId}
          viewCount={post.viewCount}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
        />
        <Viewer content={post.content} />
      </div>

      <div className={css.adfitBox}>
        <ResponsiveAdfit />
      </div>

      <div className={css.commentBox}>
        <DisqusComment
          url={`https://twosday.live/posts/${post.postId}`}
          title={`post-${post.postId} 댓글`}
          identifier={`post-${post.postId}`}
        />
      </div>
    </div>
  );
}
