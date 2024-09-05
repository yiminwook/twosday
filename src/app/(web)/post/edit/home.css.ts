import { style } from "@vanilla-extract/css";

export const main = style({
  margin: "0 auto",
  width: "100%", //컨텐츠가 없어도 늘어나게 하기 위해
  padding: 14,
  maxWidth: 1024,
  minHeight: "100dvh",
});

export const nav = style({
  height: 42,
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
});

export const navBtn = style({});

export const section = style({});
