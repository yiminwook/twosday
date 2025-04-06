"use client";
import { PORTAL_MODAL_CONTAINER_ID } from "@/constances";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import css from "./Modal.module.scss";

const mutationObserverOption: MutationObserverInit = {
  childList: true,
  subtree: false,
};

export default function PortalModalContainer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: MutationObserver;
    console.log("PortalModalContainer mounted");
    if (ref.current) {
      observer = new MutationObserver(() => {
        const size = ref.current?.childNodes.length || 0;
        console.log("size", size);
        ref.current?.classList.toggle("active", size > 0);
      });

      observer.observe(ref.current, mutationObserverOption);
    }

    console.log("PortalModalContainer mounted observer", observer!);
    return () => {
      console.log("disconnect");
      observer.disconnect();
    };
  }, []);

  return (
    <div id={PORTAL_MODAL_CONTAINER_ID} className={classNames(css.modalContainer)} ref={ref} />
  );
}
