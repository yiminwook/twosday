import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NavItemProps = {
  label: string;
  href: string;
  children?: React.ReactNode;
  direction: "rtl" | "ltr";
};

export default function NavItem({ label, href, direction, children }: NavItemProps) {
  const pathname = usePathname();

  return (
    <NavLink
      component={Link}
      href={href}
      label={label}
      active={pathname === href}
      leftSection={
        direction === "ltr" && (
          <ChevronLeft
            width="0.8rem"
            height="0.8rem"
            stroke="1.5px"
            className="mantine-rotate-ltr"
          />
        )
      }
      rightSection={
        direction === "rtl" && (
          <ChevronRight
            width="0.8rem"
            height="0.8rem"
            stroke="1.5px"
            className="mantine-rotate-rtl"
          />
        )
      }
    >
      {children}
    </NavLink>
  );
}
