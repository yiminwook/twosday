import { TPublicPost } from "@/libraries/pg/posts/posts.type";
import css from "./PostList.module.scss";
import Link from "next/link";

type Props = {
  posts: TPublicPost[];
};

export default function PostsList({ posts }: Props) {
  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <Link key={post.postId} href={`/posts/${post.postId}`}>
          <li className={css.item}>
            <div>
              <h4>{post.title}</h4>
              <br />
              <br />
              <p>{post.content}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
