import { flexCenter } from "@/style/var";
import { keyframes, style } from "@vanilla-extract/css";

const rotate = keyframes({
  "0%": {
    rotate: "0deg",
    width: "100%",
  },
  "50%": {
    width: "50%",
  },
  "100%": {
    rotate: "360deg",
    width: "100%",
  },
});

export const wrap = style([
  flexCenter,
  {
    width: "100%",
    height: "100%",
    position: "relative",
  },
]);

export const circle = style({
  width: "100%",
  height: "100%",
  border: "5px solid",
  borderRadius: "100%",
  position: "absolute",
  animationName: rotate,
  animationDuration: "10s",
  animationDelay: "1.5s",
  animationIterationCount: "infinite",
  selectors: {
    "&.a": {
      borderColor: "#dbdbdb",
      animationTimingFunction: "ease-in",
    },
    "&.b": {
      borderColor: "#c9c5bd",
      animationTimingFunction: "ease-in-out",
    },
    "&.c": {
      borderColor: "#ee756e",
      animationTimingFunction: "ease-out",
    },
  },
});
