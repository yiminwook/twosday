import { style } from "@vanilla-extract/css";

export const list = style({
  display: "flex",
  flexDirection: "column",
});

export const row = style({
  display: "flex",
  justifyContent: "space-between",
  background: "none",
  transition: "background 0.3s ease",
  padding: "0.2em",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});

export const span = style({
  cursor: "pointer",
});

export const editButton = style({
  marginRight: "0.5em",
});
