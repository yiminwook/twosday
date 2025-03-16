import { cardSlider } from "./cardSlider.css";
import Card from "./Card";
import { TPost, TPostOrderBy } from "@/libraries/pg/posts/posts.dto";
import { TSelectPost } from "@/libraries/pg/posts/posts.type";

interface CardSliderProps {
  post: TSelectPost[];
  order: TPostOrderBy;
}

export default function CardSlider({ post, order }: CardSliderProps) {
  return (
    <section className={cardSlider}>
      {post.map((item) => (
        <Card key={`${item.id}_${order}`} post={item} />
      ))}
    </section>
  );
}
