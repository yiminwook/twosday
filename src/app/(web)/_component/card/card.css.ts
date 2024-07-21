import { textLine } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const wrap = style({
  maxWidth: 250,
  position: "relative",
  borderRadius: 10,
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
});

export const imageBox = style({
  overflow: "hidden",
  aspectRatio: "1 / 1.25",
  borderRadius: 10,
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

export const desc = style({
  padding: 7,
  position: "absolute",
  bottom: 0,
  left: 0,
  backdropFilter: "blur(5px)",
  borderRadius: "0 0px 10px 10px",
});

export const title = style([
  textLine(1.6, 1),
  {
    fontSize: "1.2em",
    marginBottom: "0.5em",
  },
]);

export const tagBox = style({
  display: "flex",
  flexWrap: "wrap",
  height: 40, //태그는 2줄이상 보여주지 않는다
  overflow: "hidden",
});

globalStyle(`${tagBox} > span:not(:last-of-type)`, {
  marginRight: "0.5em",
});
