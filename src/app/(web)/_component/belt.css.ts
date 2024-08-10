import { globalStyle, keyframes, style } from "@vanilla-extract/css";

const scrollLeft = keyframes({
  from: {
    transform: "translateX(0)",
  },
  to: {
    transform: "translateX(-50%)",
  },
});

const scrollRight = keyframes({
  from: {
    transform: "translateX(-50%)",
  },
  to: {
    transform: "translateX(0%)",
  },
});

export const wrap = style({
  transform: "rotateZ(0)", // gpu 가속
  margin: "0 auto",
  position: "relative",
  width: "100%",
  overflow: "hidden",
  maskImage: `linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  );`,
});

export const row = style({
  animationDuration: "var(--belt-duration)",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  width: "200%" /* 컨텐츠가 컨테이너보다 2배 길도록 설정 */,
  animationPlayState: "running",
  selectors: {
    "&:hover": {
      animationPlayState: "paused",
    },
    "&.left": {
      animationName: scrollLeft,
    },
    "&.right": {
      animationName: scrollRight,
    },
  },
});

globalStyle(`${row} > div`, {
  display: "inline-flex",
  justifyContent: "space-around",
  width: "50%" /* 컨텐츠 안의 각 항목의 너비를 컨테이너의 절반으로 설정 */,
});
