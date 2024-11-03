import Circle from "./Circle";
import * as css from "./hero.css";

export default function Hero() {
  return (
    <div className={css.wrap}>
      <div className={css.circleBox}>
        <Circle />
      </div>
      <span className={css.heroText}>Hello, World!</span>
      <span className={css.subtitle}>개발자로 성장하는 나의 여정</span>
    </div>
  );
}
