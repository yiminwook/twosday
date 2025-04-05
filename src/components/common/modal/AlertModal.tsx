import { ModalProps } from "@/stores/modalStore";
import Modal from "./Modal";
import { useTransition } from "@/hooks/useTransition";
import classNames from "classnames";
import css from "./Modal.module.scss";
import { Button } from "@mantine/core";

export const ID = "alertModal";

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
    <Modal id={ID} onClose={onCloseWithExit}>
      <div className={classNames(css.modalCenterContent, modifier)} onAnimationEnd={onAnimationEnd}>
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>{title}</h3>
          </div>
          <p>{content}</p>
        </div>
        <div className={css.modalBtnBox}>
          <Button onClick={onCloseWithExit}>확인</Button>
        </div>
      </div>
    </Modal>
  );
}
