/* eslint-disable @next/next/no-img-element */
import Modal from "@/app/_component/modal/Modal";
import * as css from "@/app/_component/modal/modal.css";
import { ModalProps } from "@/app/_lib/modalStore";
import { modalCancelBtn, modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { useEffect, useRef } from "react";
import * as modal from "./cropModal.css";
import Cropper from "cropperjs";
import { readFile } from "./readFile";

export type CroppedData = {
  data: {
    height: number;
    width: number;
    url: string;
  };
  file: File;
};

const ID = "cropModal";

interface CropModalProps {
  file: File;
  imageUrl: string;
}

export default function CropModal({
  file,
  imageUrl,
  onSuccess,
  onClose,
}: ModalProps<CropModalProps>) {
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);

  const save = () => {
    const crop = cropperRef.current;
    if (!crop) return;
    const { width, height } = crop.getCroppedCanvas();
    crop.getCroppedCanvas().toBlob(async (blob) => {
      if (!blob) return;
      const newfile = new File([blob], file.name, { ...file });
      const url = await readFile(newfile);
      onSuccess({ data: { url, width, height }, file: newfile });
    });
  };

  useEffect(() => {
    if (!imageRef.current) return;
    cropperRef.current?.destroy();
    cropperRef.current = new Cropper(imageRef.current, {
      viewMode: 1,
      autoCropArea: 1,
      ready(event) {
        // Zoom the image to its natural size

        console.log(event.target);
        // cropperRef.current!.crop();
      },
    });

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
    };
  }, []);

  // useEffect(() => {
  //   const url = window.prompt("업로드할 이미지 url");
  //   if (!url) return;
  //   setUrl(() => url);
  // }, []);

  return (
    <Modal id={ID}>
      <div className={modal.content}>
        <div>
          <div className={css.modalHeader}>
            <h3 className={modal.title}>이미지 업로드</h3>
          </div>
          <div>
            <div className={modal.imgBox}>
              <img id="image" src={imageUrl} alt="preview" ref={imageRef} />
            </div>
          </div>
        </div>
        <div className={css.modalBtnBox}>
          <button className={modalDefaultBtn} type="button" onClick={save}>
            업로드
          </button>
          <button className={modalCancelBtn} type="button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
