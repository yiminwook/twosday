import clsx from "clsx";
import css from "./circle.module.scss";

export default function Circle() {
  return (
    <div className={css.wrap}>
      <div className={clsx(css.circle, "a")} />
      <div className={clsx(css.circle, "b")} />
      <div className={clsx(css.circle, "c")} />
    </div>
  );
}
