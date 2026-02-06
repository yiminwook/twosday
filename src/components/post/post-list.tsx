import { TPost } from "@/libraries/pg/posts/posts.type";
import Link from "next/link";
import css from "./post-list.module.scss";

type Props = {
  posts: TPost[];
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
