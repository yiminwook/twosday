import { modalCenterContent, modalTitle } from "@/app/_component/modal/modal.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const imgBox = style({});

export const content = style([
  modalCenterContent,
  {
    backgroundColor: "#666666",
  },
]);

export const title = style([
  modalTitle,
  {
    color: "#fff",
  },
]);

globalStyle(`${imgBox} img`, {
  maxWidth: "100%",
  display: "block",
});
