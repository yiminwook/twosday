"use client";
import { CategoryTree } from "@/utils/tree";
import css from "./Sidebar.module.scss";
import NavItem from "./NavItem";
import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { set } from "zod";

interface SidebarProps {
  categories: CategoryTree[];
}

export default function Sidebar({ categories }: SidebarProps) {
  const [mobileShow, setMobileShow] = useState(false);

  const toggleMobileShow = () => setMobileShow((prev) => !prev);

  return (
    <aside className={css.wrap} data-mobile-open={mobileShow}>
      <div className={css.position}>
        <div className={css.header}>
          <span>
            <ActionIcon onClick={toggleMobileShow}>X</ActionIcon>
          </span>
          <h1>Twosday</h1>
        </div>
        <div className={css.body}>
          {categories.map((category) => (
            <NavItem
              direction="rtl"
              key={category.categoriId}
              label={category.categoryName}
              href="#"
            >
              {category.children.map((child) => (
                <NavItem
                  direction="rtl"
                  key={child.categoriId}
                  label={category.categoryName}
                  href="#"
                />
              ))}
            </NavItem>
          ))}
        </div>
      </div>
    </aside>
  );
}
