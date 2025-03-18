import { PropsWithChildren } from "react";
import Header from "@/components/header/Header";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";

import "@/styles/cropper.scss";
import css from "./layout.module.scss";

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
