import { textLine } from "@/style/var";
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
});

export const image = style({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  objectPosition: "center center",
  transform: "scale(1)",
  transition: "transform 0.5s ease",
  ":hover": {
    transform: "scale(1.1)",
  },
});

export const descBox = style({
  padding: 7,
  bottom: 0,
  left: 0,
  backdropFilter: "blur(5px)",
});

export const title = style([
  textLine(1.4, 1),
  {
    fontSize: "1.2em",
    marginBottom: 10,
    fontWeight: 500,
  },
]);

export const desc = style([
  textLine(1.4, 2),
  {
    color: "#9d9d9d",
    marginBottom: 10,
  },
]);

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
