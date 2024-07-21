import Card from "./Card";
import { wrap } from "./cardSection.css";

export default function CardSection() {
  return (
    <section className={wrap}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </section>
  );
}
