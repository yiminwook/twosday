import { absoluteCenter, responsive, textLine } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const wrap = style({
  maxWidth: 250,
  position: "relative",
  borderRadius: 10,
  boxShadow: "2px 4px 12px rgba(17, 17, 17, 0.25)",
  overflow: "hidden",
});

export const imageBox = style({
  overflow: "hidden",
  aspectRatio: "5 / 4",
  backgroundColor: "#1f1212",
});

export const image = style({
  objectFit: "contain",
  width: "100%",
  height: "100%",
  objectPosition: "center center",
  transform: "scale(1)",
  transition: "transform 0.5s ease",
  selectors: {
    "&:is(img)": {},
    "&:is(img):hover": {
      transform: "scale(1.02)",
    },
    "&:is(div)": {
      maskImage: `linear-gradient(to top, transparent 5%, black 50%)`,
      // maskImage: `linear-gradient(to bottom, #1f1212a6 0%, black 100%)`,
    },
  },
});

export const placeholderText = style([
  absoluteCenter,
  {
    fontWeight: 500,
    color: "#ffffff",
    fontSize: "1em",
    ...textLine(1.2, 2),
    letterSpacing: "0.05em",
    width: "85%",
  },
  responsive({
    sm: { fontSize: "1.4em", ...textLine(1.5, 2) },
  }),
]);

export const descBox = style({
  padding: 7,
  bottom: 0,
  left: 0,
  backdropFilter: "blur(5px)",
});

export const title = style([
  {
    marginBottom: 20,
    fontWeight: 500,
    fontSize: "1em",
    ...textLine(1.2, 1),
  },
  responsive({
    sm: { fontSize: "1.2em", ...textLine(1.4, 1) },
  }),
]);

// export const desc = style([
//   textLine(1.4, 2),
//   {
//     color: "#767676",
//     marginBottom: 10,
//   },
// ]);

export const tagBox = style({
  display: "flex",
  flexWrap: "wrap",
  height: "2.8em", //태그는 2줄이상 보여주지 않는다
  overflow: "hidden",
  fontSize: "0.875em",
  color: "#2b2b2b",
});

globalStyle(`${tagBox} > span:not(:last-of-type)`, {
  marginRight: "0.5em",
});

export const editorBox = style({
  marginBottom: 10,
});

export const avatarBox = style({
  borderRadius: 9999,
  overflow: "hidden",
  width: 20,
  height: 20,
  display: "inline-block",
  verticalAlign: "middle",
  marginRight: 5,
});

export const editor = style({
  color: "#FFAC9A",
  verticalAlign: "middle",
});

export const timeBox = style({
  fontSize: "0.85em",
  color: "#767676",
});
