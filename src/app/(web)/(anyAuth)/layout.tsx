import { PropsWithChildren } from "react";
import Header from "@web/_component/header/Header";

// css 순서변경 금지
import "@/style/datepicker.css";
import * as style from "./layout.css";
import Sidebar from "@web/_component/sidebar/Sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={style.col}>
      <Header />
      <div className={style.row}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
