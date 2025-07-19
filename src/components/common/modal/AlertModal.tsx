import { ModalProps } from "@/stores/modalStore";
import { useTransition } from "@/hooks/useTransition";
import css from "./Modal.module.scss";
import { Button, Modal } from "@mantine/core";

interface AlertModalProps {
  title?: string;
  content: React.ReactNode;
}

export default function AlertModal({
  title = "Alert",
  onClose,
  content,
}: ModalProps<AlertModalProps>) {
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
        <p>{content}</p>
      </div>
      <div className={css.modalBtnBox}>
        <Button onClick={onCloseWithExit}>확인</Button>
      </div>
    </Modal>
  );
}
