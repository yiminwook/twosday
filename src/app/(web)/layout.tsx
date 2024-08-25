import { PropsWithChildren } from "react";
import Header from "@web/_component/header/Header";

// css 순서변경 금지
import "@/style/datepicker.css";
import "@/style/highlight.css"; // 코드박스 하이라이트 스타일
import "@/style/editor.css";
import "@/style/cropper.css";
import * as css from "./layout.css";
import Navigation from "@web/_component/navigation/Navigation";
import Footer from "./_component/footer/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={css.col}>
      <Header />
      <div className={css.row}>{children}</div>
      <Footer />
      <Navigation />
    </div>
  );
}
