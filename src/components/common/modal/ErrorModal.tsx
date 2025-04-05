import { ModalProps } from "@/stores/modalStore";
import css from "./Modal.module.scss";
import { useTransition } from "@/hooks/useTransition";
import classNames from "classnames";
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
