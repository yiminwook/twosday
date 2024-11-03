import { PropsWithChildren } from "react";
import Header from "@/components/header/Header";

// css 순서변경 금지
import "@/styles/datepicker.css";
import "@/styles/highlight.css"; // 코드박스 하이라이트 스타일
import "@/styles/editor.css";
import "@/styles/cropper.css";
import * as css from "./layout.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";

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
