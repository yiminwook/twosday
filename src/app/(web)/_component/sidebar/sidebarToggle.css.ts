import { keyframes, style } from "@vanilla-extract/css";

const rainbow = keyframes({
  "0%": { borderColor: "#FFB6C1" },
  "25%": { borderColor: "#eee" },
  "50%": { borderColor: "#DB7093 " },
  "75%": { borderColor: "#eee" },
  "100%": { borderColor: "#FFB6C1 " },
});

export const toggleBtn = style({
  border: "1.5px solid #ccc",
  borderRadius: 99999,
  width: 42,
  height: 42,
  transition: "border 0.4s ease",
  ":hover": {
    animation: `${rainbow} 2s infinite linear`,
  },
});
