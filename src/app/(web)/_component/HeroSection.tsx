import Circle from "./Circle";
import * as css from "./heroSection.css";

export default function HeroSection() {
  return (
    <section className={css.heroSection}>
      <div className={css.circleBox}>
        <Circle />
      </div>
      <span className={css.heroText}>Hello, World!</span>
      <span className={css.subtitle}>개발자로 성장하는 나의 여정</span>
    </section>
  );
}
