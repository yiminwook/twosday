import { responsive } from "@/style/var";
import { style } from "@vanilla-extract/css";
import { NAV_HEIGHT } from "@web/_component/navigation/navigation.css";

export const col = style({
  display: "flex",
  flexDirection: "column",
});

export const row = style([
  {
    display: "flex",
    paddingBottom: NAV_HEIGHT,
  },
  responsive({
    md: {
      paddingBottom: 0,
    },
  }),
]);
