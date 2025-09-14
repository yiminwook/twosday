import css from "./card-slider.module.scss";
import Card from "./card";
import { TPostOrderBy } from "@/libraries/pg/posts/posts.dto";
import { TPost } from "@/libraries/pg/posts/posts.type";

interface CardSliderProps {
  post: TPost[];
  order: TPostOrderBy;
}

export default function CardSlider({ post, order }: CardSliderProps) {
  return (
    <div className={css.cardSlider}>
      {post.map((item) => (
        <Card key={`${item.postId}_${order}`} post={item} />
      ))}
    </div>
  );
}
