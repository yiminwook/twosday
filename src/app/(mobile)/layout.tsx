import { PropsWithChildren } from "react";
import css from "./layout.module.scss";

export default function MobileLayout({ children }: PropsWithChildren) {
  return (
    <div className={css.wrap}>
      <div className={css.inner}>{children}</div>
    </div>
  );
}
