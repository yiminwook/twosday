import { style } from "@vanilla-extract/css";

export const footer = style({
  background:
    "linear-gradient(180deg, rgba(17,17,17,1) 0%, rgba(45,45,45,1) 65%, rgba(64,64,64,1) 92%, rgba(77,77,77,1) 100%)",
  color: "#ffffff",
});

export const inner = style({
  maxWidth: 1280,
  margin: "0 auto",
  padding: "20px",
});
