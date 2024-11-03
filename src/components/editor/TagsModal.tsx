import Modal from "@/components/common/modal/Modal";
import ModalCloseBtn from "@/components/common/modal/ModalCloseBtn";
import * as css from "@/components/common/modal/modal.css";
import { ModalProps } from "@/stores/modalStore";
import TagInput from "@/components/tagInput/TagInput";

const ID = "tagsModal";

interface TagsModalProps {
  tags: string[];
  session: Session;
}

export default function TagsModal({ onSuccess, tags, session }: ModalProps<TagsModalProps>) {
  const onClose = () => onSuccess(tags);

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>Tags</h3>
          </div>
          <TagInput tags={tags} session={session} onClose={onSuccess} />
        </div>
      </div>
    </Modal>
  );
}
