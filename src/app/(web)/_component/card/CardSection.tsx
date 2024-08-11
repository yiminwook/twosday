import { Post } from "@/type/api";
import Card from "./Card";
import { wrap } from "./cardSection.css";

interface CardSectionProps {
  post: Post[];
  order: "popular" | "recent";
}

export default function CardSection({ post, order }: CardSectionProps) {
  return (
    <section className={wrap}>
      {post.map((item) => (
        <Card key={`${item.id}_${order}`} post={item} />
      ))}
    </section>
  );
}
