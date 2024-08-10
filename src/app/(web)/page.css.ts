import { flexCenter, responsive } from "@/style/var";
import { globalStyle, style } from "@vanilla-extract/css";

export const wrap = style({
  width: "100%",
});

export const heroSection = style([
  flexCenter,
  {
    position: "relative",
    height: 450,
    width: "100%",
    backgroundColor: "#1f1212",
    flexDirection: "column",
    overflow: "hidden",
  },
]);

export const circleBox = style([
  {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(0%, -75%)",
    height: "50%",
    aspectRatio: "1 / 1",
  },
  responsive({
    sm: {
      height: "75%",
      transform: "translate(-50%, -50%)",
    },
  }),
]);

export const heroText = style([
  {
    position: "relative",
    fontSize: 58,
    fontWeight: 600,
    marginLeft: 20,
    letterSpacing: "0.025em",
    background:
      "linear-gradient(165deg, rgba(255, 172, 154, 1) 0%, rgba(240,195,181,1) 35%, rgba(225,219,209,1) 100%)",
    backgroundClip: "text",
    color: "transparent",
  },
  responsive({
    sm: { marginLeft: 0 },
    md: { fontSize: "7.5vw" },
  }),
]);

export const subtitle = style({
  position: "relative",
  color: "#E1DBD1",
  fontSize: 24,
  marginTop: 24,
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
