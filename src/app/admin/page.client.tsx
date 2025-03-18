"use client";
import { useSession } from "@/libraries/auth/useSession";

type Props = {};

export default function Client({}: Props) {
  const session = useSession().data!;
  return (
    <div>
      <h2>관리자 홈</h2>
      <div>Email: {session.email}</div>
    </div>
  );
}
