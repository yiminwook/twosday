import { Authorized } from "@/libraries/auth/Authorized";
import Client from "./layout.client";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  return (
    <Authorized>
      <Client>{children}</Client>
    </Authorized>
  );
}
