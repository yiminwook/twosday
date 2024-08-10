import { globalStyle, style } from "@vanilla-extract/css";

export const wrap = style({
  width: "100%",
});

export const section = style({
  padding: "0 20px",
  maxWidth: 1280,
  margin: "40px auto 100px",
});

export const sectionTitleBox = style({
  marginBottom: 28,
});

globalStyle(`${sectionTitleBox} > h2`, {
  color: "#787878",
  fontSize: 24,
  display: "inline-block",
  marginRight: 10,
});

globalStyle(`${sectionTitleBox} > a`, {
  fontSize: 18,
  backgroundColor: "#989898",
  paddingInline: 10,
  borderRadius: 15,
  color: "#ffffff",
});

export const moreLink = style({});

export const cardSliderBox = style({});

export const beltBox = style({});
