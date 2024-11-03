import { ModalProps } from "@/stores/modalStore";
import Modal from "./Modal";
import ModalCloseBtn from "./ModalCloseBtn";
import * as css from "./modal.css";
import { modalDefaultBtn } from "./modalBtn.css";
import { useTransition } from "@/hooks/useTransition";
import classNames from "classnames";

const ID = "errorModal";

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
    <Modal id={ID} onClose={onCloseWithExit}>
      <div className={classNames(css.modalCenterContent, modifier)} onAnimationEnd={onAnimationEnd}>
        <ModalCloseBtn onClose={onCloseWithExit} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>{title}</h3>
          </div>
          <p>{error.message}</p>
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
