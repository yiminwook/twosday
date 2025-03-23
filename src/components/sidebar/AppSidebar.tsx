"use client";
import { CategoryTree } from "@/utils/tree";
import css from "./AppSidebar.module.scss";
import { ActionIcon, NavLink, TextInput } from "@mantine/core";
import { useState } from "react";
import { CornerDownRight, PanelLeftClose, PanelLeftOpen, PenLine, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  categories: CategoryTree[];
};

export default function AppSidebar({ categories }: Props) {
  const [mobileShow, setMobileShow] = useState(false);

  const toggleMobileShow = () => setMobileShow((prev) => !prev);

  return (
    <aside className={css.wrap} data-mobile-open={mobileShow}>
      <div className={css.position}>
        <div className={css.header}>
          <span>
            <ActionIcon variant="transparent" onClick={toggleMobileShow}>
              {mobileShow ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </ActionIcon>
          </span>
        </div>
        <div className={css.card}>
          <TextInput
            placeholder="검색"
            rightSection={
              <ActionIcon>
                <Search size={14} />
              </ActionIcon>
            }
          />
          <p>개발 블로그 입니다.</p>
          <p>GitHub</p>
          <ActionIcon component={Link} href="/posts/edit" radius="lg">
            <PenLine size={14} />
          </ActionIcon>
        </div>
        <div className={css.nav}>
          {categories.map((category) => (
            <NavItem key={category.categoriId} category={category} isFirstLoop />
          ))}
        </div>
      </div>
    </aside>
  );
}

type NavItemProps = {
  category: CategoryTree;
  isFirstLoop: boolean;
};

function NavItem({ category, isFirstLoop = true }: NavItemProps) {
  const pathname = usePathname();

  const label = `${category.categoryName} (${category.postCount})`;
  const leftSection = isFirstLoop ? null : <CornerDownRight size={14} />;

  if (category.children.length === 0) {
    return (
      <NavLink
        key={category.categoriId}
        component={Link}
        label={label}
        active={pathname === category.categoriId.toString()}
        href="#"
        leftSection={leftSection}
      />
    );
  }

  return (
    <NavLink
      key={category.categoriId}
      component={Link}
      label={label}
      active={pathname === category.categoriId.toString()}
      href="#"
      opened
      leftSection={leftSection}
      rightSection={true} // 안보이게
      childrenOffset="xs"
    >
      {category.children.map((child) => (
        <NavItem key={child.categoriId} category={child} isFirstLoop={false} />
      ))}
    </NavLink>
  );
}
