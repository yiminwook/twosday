import { globalVar } from "@/style/globalTheme.css";
import { responsive, zIndex } from "@/style/var";
import { style } from "@vanilla-extract/css";

export const NAV_HEIGHT = 52;

export const wrap = style([
  {
    height: NAV_HEIGHT,
  },
  responsive({
    md: { display: "none" },
  }),
]);

export const inner = style([
  zIndex.navigation,
  {
    display: "block",
    width: "100%",
    height: NAV_HEIGHT,
    position: "fixed",
    bottom: 0,
    backgroundColor: "#fff",
    boxShadow: "rgba(17, 17, 26, 0.1) 0 -2px 4px 0",
  },
]);

export const list = style({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100%",
});

export const link = style({
  display: "flex",
  alignItems: "center",
  gap: 5,
  padding: "9px 18px",
  borderRadius: 10,
  transition: "background-color 0.2s",
});

export const pencil = style({
  ":hover": {
    color: globalVar.purpleActive,
  },
});
