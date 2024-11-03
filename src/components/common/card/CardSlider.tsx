import { cardSlider } from "./cardSlider.css";
import Card from "./Card";
import { Post } from "@/types/api";

interface CardSliderProps {
  post: Post[];
  order: "popular" | "recent";
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
