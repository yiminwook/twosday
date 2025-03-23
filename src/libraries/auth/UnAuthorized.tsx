"use client";
import { useSession, useSuspenseSession } from "@/libraries/auth/useSession";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { HOME_PATH } from "./config";

// 세션이 있으면 Home_PATH으로 리다이렉트

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function UnAuthorized({ children, fallback }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session !== undefined && session !== null) {
      router.replace(HOME_PATH);
    }
  }, [session, router]);

  if (session === undefined) return <>{fallback}</>;
  if (session !== null) return null;
  return <>{children}</>;
}

export function AwaitUnAuthorized({ children }: PropsWithChildren) {
  const { data: session } = useSuspenseSession();
  const router = useRouter();

  useEffect(() => {
    if (session !== undefined && session !== null) {
      router.replace(HOME_PATH);
    }
  }, [session, router]);

  if (session === undefined) return null;
  if (session !== null) return null;
  return <>{children}</>;
}
