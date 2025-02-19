import { PropsWithChildren } from "react";
import * as css from "./layout.css";

export default function MobileLayout({ children }: PropsWithChildren) {
  return (
    <div className={css.wrap}>
      <div className={css.inner}>{children}</div>
    </div>
  );
}
