import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import css from "@/components/common/modal/modal.module.scss";
import { ModalProps } from "@/stores/modal-store";
import { useRouter } from "next/navigation";
import { Button, Modal, TextInput } from "@mantine/core";
import { clientApi, revalidateApi } from "@/apis/fetcher";
import { toast } from "sonner";
import { REFERENCE_TAG } from "@/constants";

type Props = {
  session: Session;
};

export default function PostRefernceModal({ onClose, onSuccess, session }: ModalProps<Props>) {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (arg: { url: string }) => {
      await clientApi
        .post<{
          message: string;
          data: { id: number };
        }>("references", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          json: { url: arg.url },
        })
        .json();
    },
    onSuccess: async () => {
      await revalidateApi.get(`tag?name=${REFERENCE_TAG}`);
      router.refresh();
      onSuccess(true);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mutation.isPending) return;

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      toast.error("URL을 입력해주세요.");
      return;
    }

    mutation.mutate({ url: trimmedUrl });
  };

  return (
    <Modal
      onClose={onClose}
      opened
      title="자료 추가하기"
      withinPortal={false}
      overlayProps={{ opacity: 0 }}
      centered
    >
      <form onSubmit={onSubmit}>
        <div>
          <p>URL로 참고자료를 추가할수있습니다.</p>
          <TextInput mt={10} onChange={(e) => setUrl(e.target.value)} size="sm" />
        </div>
        <div className={css.modalBtnBox}>
          <Button type="submit" loading={mutation.isPending} size="sm">
            확인
          </Button>
        </div>
      </form>
    </Modal>
  );
}
