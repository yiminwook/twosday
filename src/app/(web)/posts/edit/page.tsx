"use client";
// import Home from "@/components/editor/Home";
import { Authorized } from "@/libraries/auth/Authorized";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/components/editor/Home"), { ssr: false });

export default function Page() {
  return (
    <Authorized fallback={null}>
      <Home />
    </Authorized>
  );
}
