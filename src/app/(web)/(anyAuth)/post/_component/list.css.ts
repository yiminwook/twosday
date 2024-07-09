import { style } from "@vanilla-extract/css";

export const wrap = style({
  display: "flex",
  flexDirection: "column",
});

export const row = style({
  display: "flex",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#f0f0f0",
  },
});

export const header = style([{ display: "flex", fontWeight: "bold" }]);

export const headerCell = style({
  flex: 1,
  width: 150,
});

export const cell = style({
  flex: 1,
  width: 150,
});
