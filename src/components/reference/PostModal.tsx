import Modal from "@/components/common/modal/Modal";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import * as css from "@/components/common/modal/modal.css";
import { ModalProps } from "@/stores/modalStore";
import { modalDefaultBtn } from "@/components/common/modal/modalBtn.css";
import { useRouter } from "next/navigation";
import ModalCloseBtn from "@/components/common/modal/ModalCloseBtn";

const ID = "referencePostModal";

interface PostModalProps {
  session: Session;
}

export default function PostModal({ onClose, onSuccess, session }: ModalProps<PostModalProps>) {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      // const response = await fetch(`${getWasUrl()}/api/twosday/reference`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${session.accessToken}`,
      //   },
      //   body: JSON.stringify({ url }),
      // });
      // const body: { message: string[] } = await response.json();
      // if (!response.ok) {
      //   throw new Error(body.message[0]);
      // }
    },
    onSuccess: () => {
      router.refresh();
      onSuccess(true);
    },
    onSettled: async () => {
      // https://nextjs.org/docs/app/api-reference/functions/revalidateTag
      await fetch("/api/revalidate/tag?name=reference");
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(url);
    mutation.mutate();
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form className={css.modalCenterContent} onSubmit={onSubmit}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>자료 추가하기</h3>
          </div>
          <p>URL로 참고자료를 추가할수있습니다.</p>
          <div style={{ border: "1px solid black" }}>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        </div>
        <div className={css.modalBtnBox}>
          <button className={modalDefaultBtn} type="submit">
            확인
          </button>
        </div>
      </form>
    </Modal>
  );
}
