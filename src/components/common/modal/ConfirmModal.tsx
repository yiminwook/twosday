import { ModalProps } from "@/stores/modalStore";
import Modal from "./Modal";
import css from "./Modal.module.scss";
import { useTransition } from "@/hooks/useTransition";
import classNames from "classnames";
import { Button } from "@mantine/core";

const ID = "confirmModal";

interface ConfirmModalProps {
  title?: string;
  content: React.ReactNode;
}

export default function ConfirmModal({
  title = "Confirm",
  content,
  onClose,
  onSuccess,
}: ModalProps<ConfirmModalProps>) {
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
          <Button variant="outline" onClick={onCloseWithExit}>
            취소
          </Button>
          <Button onClick={() => exit(() => onSuccess(true))}>확인</Button>
        </div>
      </div>
    </Modal>
  );
}
