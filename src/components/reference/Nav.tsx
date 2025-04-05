"use client";
import { useSetModalStore } from "@/stores/modalStore";
import PostModal from "./PostModal";
import { Button } from "@mantine/core";

interface NavProps {
  session: Session | null;
}

export default function Nav({ session }: NavProps) {
  const modalStore = useSetModalStore();
  const onClick = async () => {
    if (!session) return;
    await modalStore.push(PostModal, {
      props: { session },
    });
  };

  return (
    <div>
      <h2>참고자료</h2>
      {/* TODO: 로그인한 관리자만 추가가능 하도록 변경 */}
      {!!session && <Button onClick={onClick}>추가하기</Button>}
    </div>
  );
}
