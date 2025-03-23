"use client";
import { useSession, useSuspenseSession } from "@/libraries/auth/useSession";

export function withSession<P extends { session: Session }>(Component: React.ComponentType<P>) {
  return function WithSession(props: Omit<P, "session">) {
    const session = useSession().data;
    if (!session) return null;
    return <Component {...(props as P)} session={session} />;
  };
}

export function withAwaitSession<P extends { session: Session }>(
  Component: React.ComponentType<P>,
) {
  return function WitAwaitSession(props: Omit<P, "session">) {
    const session = useSuspenseSession().data;
    if (!session) return null;
    return <Component {...(props as P)} session={session} />;
  };
}
