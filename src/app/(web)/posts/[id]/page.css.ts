import { style } from "@vanilla-extract/css";

export const wrap = style({
  margin: "0 auto",
  width: "100%",
  maxWidth: 1280,
  border: "1px solid red",
});

export const viewerHead = style({
  display: "flex",
});

export const viewerBox = style({
  marginBottom: "auto",
  minHeight: "calc(100dvh - 52px)",
  padding: 5,
});

export const commentBox = style({
  padding: 5,
  marginBlock: 20,
});
