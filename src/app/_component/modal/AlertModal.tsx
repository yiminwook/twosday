import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import * as css from "./modal.css";
import { modalDefaultBtn } from "./modalBtn.css";
import { useTransition } from "@/app/_lib/useTransition";
import classNames from "classnames";

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
          <button className={modalDefaultBtn} type="button" onClick={onCloseWithExit}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
