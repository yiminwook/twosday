import { responsive } from "@/style/var";
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

export const wrap = style([
  {
    transform: "rotateZ(0)", // gpu 가속
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    /** 좌우 흐려지는 효과 */
    maskImage: `linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 1) 95%,
    rgba(0, 0, 0, 0)
  );`,
  },
  responsive({
    sm: {
      maskImage: `linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1) 10%,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0)
      );`,
    },
  }),
]);

export const row = style({
  /* 컨텐츠가 컨테이너보다 2배 길도록 설정 */
  width: "max(calc(var(--belt-item-width) * var(--belt-item-length) * 2), 200%)",
  animationDuration: "var(--belt-duration)",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationPlayState: "running",
  marginBlock: 5,
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
  /** 컨텐츠 안의 각 항목의 너비를 컨테이너의 절반(100%)으로 설정 */
  width: "50%",
});

export const techBeltItem = style({
  fontSize: 16,
  wordBreak: "keep-all",
  fontWeight: 500,
  padding: "10px 15px",
  borderRadius: 5,
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
});

globalStyle(`${techBeltItem} > img`, {
  marginRight: 8,
  verticalAlign: "middle",
});

globalStyle(`${techBeltItem} > span`, {
  verticalAlign: "middle",
});
