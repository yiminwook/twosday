"use client";
import PostRefernceModal from "./post-refernce-modal";
import { Button } from "@mantine/core";
import { useSession } from "@/libraries/auth/use-session";
import css from "./nav.module.scss";
import { useState } from "react";
import Portal from "@/components/common/modal/portal";

interface NavProps {}

export default function Nav({}: NavProps) {
  const { data: session } = useSession();
  const [showPostModal, setShowPostModal] = useState(false);

  const openPostModal = () => setShowPostModal(() => true);
  const closePostModal = () => setShowPostModal(() => false);

  return (
    <>
      <div className={css.wrap}>
        <h2>참고자료</h2>
        {/* TODO: 로그인한 관리자만 추가가능 하도록 변경 */}
        {!!session && <Button onClick={openPostModal}>추가하기</Button>}
      </div>
      {session && showPostModal && (
        <Portal>
          <PostRefernceModal
            session={session}
            onClose={closePostModal}
            onSuccess={closePostModal}
          />
        </Portal>
      )}
    </>
  );
}
