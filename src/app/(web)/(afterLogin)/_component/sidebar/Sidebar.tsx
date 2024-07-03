"use client";

import { useApp } from "@/app/_lib/app";
import { useStore } from "zustand";
import { layout, sidebar } from "./sidebar.css";
import classNames from "classnames";
import SidebarMenuList from "./SidebarMenuList";

export default function Sidebar() {
  const store = useApp();
  const isSidebarToggle = useStore(store, (store) => store.sidebar);
  const actions = useStore(store, (store) => store.actions);

  return (
    <div className={classNames(layout, isSidebarToggle && "show")}>
      <aside className={classNames(sidebar, isSidebarToggle && "show")}>
        <SidebarMenuList />
      </aside>
    </div>
  );
}
