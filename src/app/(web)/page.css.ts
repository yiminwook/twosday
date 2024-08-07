import { flexCenter, responsive } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const wrap = style({
  width: "100%",
});

export const heroSection = style([
  flexCenter,
  {
    height: 450,
    width: "100%",
    backgroundColor: "#1f1212",
  },
]);

export const heroText = style([
  {
    fontSize: 100,
    fontWeight: 600,
    marginLeft: 20,
    background:
      "linear-gradient(165deg, rgba(255,172,154,1) 0%, rgba(240,195,181,1) 35%, rgba(225,219,209,1) 100%)",
    backgroundClip: "text",
    color: "transparent",
  },
  responsive({
    sm: { marginLeft: 0 },
  }),
]);

export const section = style({
  padding: "0 20px",
  maxWidth: 1280,
  margin: "40px auto 80px",
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
