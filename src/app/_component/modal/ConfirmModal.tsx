import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "./Modal";
import * as css from "./modal.css";
import { modalCancelBtn, modalDefaultBtn } from "./modalBtn.css";
import { useTransition } from "@/app/_lib/useTransition";
import classNames from "classnames";

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
          <button className={modalCancelBtn} type="button" onClick={onCloseWithExit}>
            취소
          </button>
          <button
            className={modalDefaultBtn}
            type="button"
            onClick={() => exit(() => onSuccess(true))}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
