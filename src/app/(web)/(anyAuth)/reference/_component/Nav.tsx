"use client";
import { defaultBtn } from "@/app/_component/btn/btn.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import PostModal from "./PostModal";

export default function Nav() {
  const modalStore = useSetModalStore();
  const onClick = async () => {
    await modalStore.push(PostModal, {
      props: {},
    });
  };

  return (
    <div>
      <h2>참고자료</h2>
      {/* TODO: 로그인한 관리자만 추가가능 하도록 변경 */}
      <button className={defaultBtn} onClick={onClick}>
        추가하기
      </button>
    </div>
  );
}
