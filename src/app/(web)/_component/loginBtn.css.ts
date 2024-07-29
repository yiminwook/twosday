import { style } from "@vanilla-extract/css";

export const loginBtn = style({
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
