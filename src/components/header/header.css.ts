import { responsive, zIndex } from "@/styles/var";
import { globalStyle, style } from "@vanilla-extract/css";

const HEADER_HEIGHT = 52;

export const wrap = style([
  {
    width: "100%",
    height: HEADER_HEIGHT,
  },
  responsive({
    md: {
      display: "block",
    },
  }),
]);

export const fixed = style([
  zIndex.header,
  {
    position: "fixed",
    height: HEADER_HEIGHT,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
    opacity: 0.85,
  },
]);

export const inner = style({
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
  maxWidth: 1280,
  margin: "0 auto",
});

globalStyle(`${inner} > div`, {
  display: "flex",
  alignItems: "center",
  gap: 7,
});

export const title = style({
  fontSize: 16,
  fontWeight: 500,
});

export const right = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 10,
});

export const link = style({
  display: "flex",
  alignItems: "center",
  gap: 5,
  padding: "9px 18px",
  borderRadius: 10,
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#f1f3f5",
  },
});

export const upload = style([
  {
    display: "none",
  },
  responsive({
    md: {
      display: "block",
    },
  }),
]);
