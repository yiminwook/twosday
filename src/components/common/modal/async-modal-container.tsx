"use client";
import { ASYNC_MODAL_CONTAINER_ID } from "@/constants";
import { useModalStore } from "@/stores/modal-store";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import css from "./modal.module.scss";

export default function AsyncModalContainer() {
  const store = useModalStore();
  const pathname = usePathname();

  useEffect(() => {
    store.actions.closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      id={ASYNC_MODAL_CONTAINER_ID}
      className={clsx(css.modalContainer, { active: store.modals.length > 0 })}
    >
      {store.modals.map((modalInfo) => (
        <modalInfo.Component key={modalInfo.key} {...modalInfo.props} />
      ))}
    </div>
  );
}
