import { wrap } from "./tag.css";

interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return <span className={wrap}>{name}</span>;
}
