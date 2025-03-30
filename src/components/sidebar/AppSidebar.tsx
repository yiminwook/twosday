"use client";
import { CategoryTree } from "@/utils/tree";
import css from "./AppSidebar.module.scss";
import { ActionIcon, NavLink, Tooltip } from "@mantine/core";
import { CornerDownRight, KeyRound, LogOut, PanelLeftClose, PenLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/stores/app";
import { useMutation } from "@tanstack/react-query";
import { clientApi } from "@/apis/fetcher";
import { useSession } from "@/libraries/auth/useSession";

const TOOLTIP_Z_INDEX = 10002;

type Props = {
  categories: CategoryTree[];
};

export default function AppSidebar({ categories }: Props) {
  const showMobileSidebar = useAppStore((state) => state.showMobileSidebar);
  const setShowMobileSidebar = useAppStore((state) => state.actions.setShowMobileSidebar);
  const closeMobileView = () => setShowMobileSidebar(false);

  const query = useSession();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await clientApi.post("auth/signout", {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const onClickLogout = () => {
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <aside className={css.wrap} data-mobile-open={showMobileSidebar}>
      <div className={css.position}>
        <div className={css.header}>
          <ActionIcon className={"mobileOnly"} variant="transparent" onClick={closeMobileView}>
            <PanelLeftClose size={20} />
          </ActionIcon>
        </div>
        <div className={css.overviewBox}>
          <div>
            <p>비즈니스 요구사항을</p>
            <p>코드로 녹여내기</p>
          </div>

          <div className={css.actionIconBox}>
            <Tooltip label="GitHub" withArrow zIndex={TOOLTIP_Z_INDEX}>
              <ActionIcon component="a" href="https://github.com/xoxoinny0/twosday" radius="lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </ActionIcon>
            </Tooltip>

            <Tooltip label="글작성" withArrow zIndex={TOOLTIP_Z_INDEX}>
              <ActionIcon component={Link} href="/posts/edit" radius="lg">
                <PenLine size={14} />
              </ActionIcon>
            </Tooltip>

            {/* placeholder */}
            {query.isPending && (
              <ActionIcon radius="lg" loading w={26} h={26}>
                <KeyRound size={14} />
              </ActionIcon>
            )}

            {!query.isPending && !!query.data && (
              <Tooltip label="로그인" withArrow zIndex={TOOLTIP_Z_INDEX}>
                <ActionIcon component={Link} href="/signin" radius="lg">
                  <KeyRound size={14} />
                </ActionIcon>
              </Tooltip>
            )}

            {!query.isPending && !query.data && (
              <Tooltip label="로그아웃" withArrow zIndex={TOOLTIP_Z_INDEX}>
                <ActionIcon radius="lg" loading={mutation.isPending} onClick={onClickLogout}>
                  <LogOut size={14} />
                </ActionIcon>
              </Tooltip>
            )}
          </div>
        </div>
        <div className={css.nav}>
          {categories.map((category) => (
            <NavItem key={category.categoryId} category={category} isFirstLoop />
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
        key={category.categoryId}
        component={Link}
        label={label}
        active={pathname === category.categoryId.toString()}
        href="#"
        leftSection={leftSection}
      />
    );
  }

  return (
    <NavLink
      key={category.categoryId}
      component={Link}
      label={label}
      active={pathname === category.categoryId.toString()}
      href="#"
      leftSection={leftSection}
      // rightSection={true} // 안보이게
    >
      {category.children.map((child) => (
        <NavItem key={child.categoryId} category={child} isFirstLoop={false} />
      ))}
    </NavLink>
  );
}
