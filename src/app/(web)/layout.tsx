import { PropsWithChildren } from "react";
import Header from "@/components/header/Header";
import Navigation from "@/components/navigation/Navigation";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { CategoryTree } from "@/utils/tree";

import "@/styles/cropper.scss";
import css from "./layout.module.scss";

export default async function Layout({ children }: PropsWithChildren) {
  const categories = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)
    .then((res) => res.json() as Promise<{ data: CategoryTree[]; message: string }>)
    .then((res) => res.data);

  return (
    <div className={css.shell}>
      <AppSidebar categories={categories} />
      <div className={css.app}>
        <Header />
        <div className={css.expand}>{children}</div>
        <Navigation />
      </div>
    </div>
  );
}
