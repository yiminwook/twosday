import { globalStyle, style } from "@vanilla-extract/css";
import { flexCenter, zIndex } from "@/style/var";

export const layout = style({
  position: "relative",
  width: 0,
  flexShrink: 0,
  transition: "width 0.3s ease",
  selectors: {
    "&.show": {
      width: 200,
    },
  },
});

export const sidebar = style([
  zIndex.sidebar,
  {
    padding: 15,
    position: "fixed",
    width: 200,
    top: 52,
    height: "calc(100dvh - 52px)",
    backgroundColor: "#FFFAFA     ",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    visibility: "hidden",
    opacity: 0,
    left: -200,
    transition: "left 0.3s ease, visibility 0.3s ease, opacity 0.3s ease",
    selectors: {
      "&.show": {
        visibility: "visible",
        opacity: 1,
        left: 0,
      },
    },
  },
]);

export const menuList = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

globalStyle(`${menuList} > li`, {
  position: "relative",
  padding: 10,
  cursor: "pointer",
  color: "#8A8A8A",
  transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
  //   borderRadius: 5,
});

globalStyle(`${menuList} > li::before`, {
  content: "''",
  position: "absolute",
  width: "100%",
  height: 2,
  borderRadius: 4,
  backgroundColor: "#FFB6C1 ",
  bottom: 0,
  left: 0,
  transformOrigin: "right",
  transform: "scaleX(0)",
  transition: "transform 0.3s ease-in-out",
});

globalStyle(`${menuList} > li:hover::before`, {
  transformOrigin: "left",
  transform: "scaleX(1)",
});

globalStyle(`${menuList} > li:hover`, {
  //   borderBottom: "1px solid #FFB6C1 ",
  backgroundColor: "rgba(255, 228, 225, 0.3)",
  color: "#FFB6C1 ",
});

export const createBtn = style([
  flexCenter,
  {
    border: "1px solid #A0A0A0",
    borderRadius: 999999,
    gap: 5,
  },
]);
