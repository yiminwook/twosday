import { fixedMaxSize, flexCenter, responsive, zIndex } from "@/styles/var";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";

const enter = keyframes({
  from: {
    transform: "translateY(25px)",
    opacity: 0,
  },
  to: {
    transform: "translateY(0)",
    opacity: 1,
  },
});

export const modalLayout = style([
  zIndex.modal,
  flexCenter,
  fixedMaxSize,
  {
    selectors: {
      "&::-webkit-scrollbar": {
        width: 3, // 스크롤바 너비
      },
    },
  },
]);

globalStyle(`${modalLayout} .enter`, {
  animation: `${enter} 0.3s forwards`,
});

globalStyle(`${modalLayout} .show`, {
  opacity: 1,
  transform: "translateY(0)",
});

globalStyle(`${modalLayout} .exit`, {
  animation: `${enter} 0.3s forwards`,
  animationDirection: "reverse",
});

export const modalCenterContent = style({
  position: "relative",
  width: 500,
  padding: 14,
  backgroundColor: "#fff",
  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  borderRadius: 10,

  maxWidth: "calc(100% - 20px)",
  maxHeight: "calc(100% - 20px)",
  minHeight: 200,

  overflowY: "auto",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const modalBottomContent = style([
  {
    position: "relative",
    width: "100%",
    padding: 14,
    backgroundColor: "#fff",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    borderRadius: "10px 10px 0 0",

    maxHeight: "calc(100% - 10px)",
    minHeight: 150,

    overflowY: "auto",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    marginTop: "auto", // 아래로 붙이기
  },
  responsive({
    sm: {
      width: "auto", // 태블릿 이상에서는 컨텐츠 너비에 맞춰서
    },
  }),
]);

export const modalHeader = style({
  marginBottom: 7,
});

export const modalTitle = style({
  fontSize: 16,
});

export const modalBtnBox = style({
  display: "flex",
  flexDirection: "row-reverse",
  gap: 14,
  marginTop: 20,
});

globalStyle(`${modalBtnBox} > button`, {
  width: 100,
});
