import { flexCenter, responsive } from "@/style/var";
import { style } from "@vanilla-extract/css";

export const wrap = style([
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
    maskImage: `linear-gradient(to top, transparent 5%, black 100%)`,
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
