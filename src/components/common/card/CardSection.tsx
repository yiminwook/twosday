import { TPost, TPostOrderBy } from "@/libraries/pg/posts/posts.dto";
import Card from "./Card";
import { wrap } from "./cardSection.css";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";

interface CardSectionProps {
  post: TPublicPost[];
  order: TPostOrderBy;
}

export default function CardSection({ post, order }: CardSectionProps) {
  return (
    <section className={wrap}>
      {post.map((item) => (
        <Card key={`${item.postId}_${order}`} post={item} />
      ))}
    </section>
  );
}
