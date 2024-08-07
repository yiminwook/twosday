import { responsive } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const cardSlider = style([
  {
    display: "flex",
    gap: "2.5%",
    width: "100%",
    overflowX: "scroll",
    scrollSnapType: "x mandatory",
    paddingBottom: 10,
    ...responsive({
      md: { gap: 10 },
    }),
    selectors: {
      "&::-webkit-scrollbar": {
        height: 5,
      },
    },
  },
]);

globalStyle(`${cardSlider} > article`, {
  scrollSnapAlign: "center",
  minWidth: "47.5%",
  ...responsive({
    md: {
      minWidth: "25%",
    },
  }),
});
