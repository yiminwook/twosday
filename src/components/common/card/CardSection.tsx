import { TPost, TPostOrderBy } from "@/libraries/pg/posts/posts.dto";
import Card from "./Card";
import css from "./CardSection.module.scss";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";

interface CardSectionProps {
  post: TPublicPost[];
  order: TPostOrderBy;
}

export default function CardSection({ post, order }: CardSectionProps) {
  return (
    <section className={css.wrap}>
      {post.map((item) => (
        <Card key={`${item.postId}_${order}`} post={item} />
      ))}
    </section>
  );
}
