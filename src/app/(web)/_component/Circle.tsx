import classNames from "classnames";
import * as css from "./circle.css";

export default function Circle() {
  return (
    <div className={css.wrap}>
      <div className={classNames(css.circle, "a")} />
      <div className={classNames(css.circle, "b")} />
      <div className={classNames(css.circle, "c")} />
    </div>
  );
}
