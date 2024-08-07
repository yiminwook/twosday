import { cardSlider } from "./cardSlider.css";
import Card from "./Card";

export default function CardSlider() {
  return (
    <section className={cardSlider}>
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
