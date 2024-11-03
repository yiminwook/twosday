import { PropsWithChildren } from "react";
import Header from "@/components/header/Header";

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
