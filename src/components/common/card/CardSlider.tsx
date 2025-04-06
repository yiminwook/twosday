import css from "./CardSlider.module.scss";
import Card from "./Card";
import { TPost, TPostOrderBy } from "@/libraries/pg/posts/posts.dto";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";

interface CardSliderProps {
  post: TPublicPost[];
  order: TPostOrderBy;
}

export default function CardSlider({ post, order }: CardSliderProps) {
  return (
    <section className={css.cardSlider}>
      {post.map((item) => (
        <Card key={`${item.postId}_${order}`} post={item} />
      ))}
    </section>
  );
}
