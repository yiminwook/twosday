import Fire from "@/libraries/error/fire";
import { PropsWithChildren } from "react";

export default function TestErrorLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Fire label="layout" />
      {children}
    </>
  );
}
