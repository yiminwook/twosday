"use client";
import NavItem from "@/components/sidebar/NavItem";
import { AppShell, Burger, Button, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { MouseEvent } from "react";
import css from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function Client({ children }: Props) {
  const [opened, { toggle, close }] = useDisclosure();

  const onClickSidebarNav = (e: MouseEvent<HTMLDivElement>) => {
    // event delegation
    const target = e.target as HTMLElement;
    const achor = target.closest("a");
    if (achor) close();
  };

  return (
    <AppShell
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header classNames={{ header: css.header }}>
        <Flex align="center" h="100%" px="sm" justify="space-between">
          <Flex align="center">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mr="sm" />
            <Link href="/admin">
              <Title component="h1" size="1.25rem">
                Admin
              </Title>
            </Link>
          </Flex>
          <Flex>
            <Button component={Link} href="/" size="xs">
              나가기
            </Button>
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="xs" onClick={onClickSidebarNav}>
        <NavItem direction="rtl" href="/admin" label="관리자 홈" />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
