import { ModalProps } from "@/stores/modal-store";
import css from "./modal.module.scss";
import { useTransition } from "@/hooks/use-transition";
import { Button, Modal } from "@mantine/core";

interface ErrorModalProps {
  title?: string;
  error: Error;
}

export default function ErrorModal({
  title = "Message",
  onClose,
  error,
}: ModalProps<ErrorModalProps>) {
  const { modifier, onAnimationEnd, exit } = useTransition();

  const onCloseWithExit = () => {
    exit(() => onClose());
  };

  return (
    <Modal
      onClose={onCloseWithExit}
      title={title}
      opened
      centered
      withinPortal={false}
      overlayProps={{ opacity: 0 }}
    >
      <div>
        <p>{error.message}</p>
      </div>
      <div className={css.modalBtnBox}>
        <Button onClick={onCloseWithExit}>확인</Button>
      </div>
    </Modal>
  );
}
