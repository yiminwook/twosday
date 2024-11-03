import { createTheme, createThemeContract, globalStyle, style } from "@vanilla-extract/css";

export const loading = style({});

globalStyle(`${loading} .ql-container`, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 665,
});

export const editorVar = createThemeContract({
  border: {
    color: null,
    radius: null,
    active: null,
  },
  background: {
    color: null,
  },
});

export const lightTheme = createTheme(editorVar, {
  border: {
    color: "#ccc",
    radius: "0.25rem",
    active: "#ee756e",
  },
  background: {
    color: "#fff",
  },
});

export const editor = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  border: "1px solid",
  borderColor: editorVar.border.color,
  borderRadius: editorVar.border.radius,
  caretColor: editorVar.border.active,
});

export const control = style({
  padding: 5,
  flexWrap: "wrap",
  display: "flex",
  alignItems: "center",
  // position: "sticky",
  top: 51, // header height - 1
  zIndex: 1,
  backgroundColor: editorVar.background.color,
  gap: "0.75rem",
  borderBottom: "1px solid",
  borderColor: editorVar.border.color,
  borderStartStartRadius: editorVar.border.radius,
  borderStartEndRadius: editorVar.border.radius,
});

export const buttonGroup = style({
  display: "flex",
});

export const button = style({
  border: "1px solid",
  flexShrink: 0,
  borderColor: editorVar.border.color,
  padding: editorVar.border.radius,
  selectors: {
    "&.active": {
      backgroundColor: "#f0f0f0",
    },
    "&:first-of-type": {
      borderStartStartRadius: editorVar.border.radius,
      borderEndStartRadius: editorVar.border.radius,
    },
    "&:last-of-type": {
      borderStartEndRadius: editorVar.border.radius,
      borderEndEndRadius: editorVar.border.radius,
    },
    "&:not(:last-of-type)": {
      borderInlineEndWidth: 0, // 오른쪽 보더 중첩 제거
    },
  },
});

export const body = style({
  padding: 5,
});

globalStyle(`.ProseMirror`, {
  minHeight: 500,
});

globalStyle(`${editor} .ProseMirror-focused`, {
  outline: "none",
});

globalStyle(`${editor} strong`, {
  fontWeight: 600,
});

globalStyle(`${editor} img`, {
  display: "block",
  height: "auto",
  margin: "0 auto",
  maxWidth: "100%",
});

globalStyle(`${editor} iframe`, {
  display: "block",
  height: "auto",
  aspectRatio: "16 / 9",
  margin: "0 auto",
  maxWidth: "100%",
});

globalStyle(`${editor} img.ProseMirror-selectednode`, {
  outline: "2px solid",
  outlineColor: editorVar.border.active,
});

globalStyle(`${editor} pre`, {
  position: "relative",
  borderRadius: "0.5rem",
  margin: "1.5rem 0",
  padding: "0.75rem 1rem",
  background: "#444444",
  color: "#dddddd",
});

globalStyle(`${editor} code.hljs`, {
  background: "none",
  color: "inherit",
});

globalStyle(
  `
  ${editor} h1, 
  ${editor} h2, 
  ${editor} h3
  `,
  {
    lineHeight: 1.1,
    marginTop: "2.5rem",
    textWrap: "pretty",
  },
);

globalStyle(
  `
  ${editor} h1,
  ${editor} h2
  `,
  {
    marginBottom: "1.5rem",
  },
);

globalStyle(`${editor} h1`, {
  fontSize: "1.4rem",
});

globalStyle(`${editor} h2`, {
  fontSize: "1.2rem",
});

globalStyle(`${editor} h3`, {
  fontSize: "1rem",
});

globalStyle(`${editor} hr`, {
  border: "none",
  borderTop: `2px solid ${editorVar.border.color}`,
  cursor: "pointer",
  margin: "2rem 0",
});

globalStyle(`${editor} .ProseMirror-selectednode`, {
  borderTop: `2px solid ${editorVar.border.active}`,
});

globalStyle(
  `
  ${editor} ol,
  ${editor} ul
  `,
  {
    padding: "0 1rem",
    margin: "1.25rem 1rem 1.25rem 0.4rem",
  },
);

globalStyle(`${editor} ol`, {
  listStyleType: "decimal",
});

globalStyle(`${editor} ul`, {
  listStyleType: "disc",
});

globalStyle(`${editor} li p`, {
  marginTop: "0.25em",
  marginBottom: "0.25em",
});

globalStyle(`${editor} :first-child`, {
  marginTop: 0, // 첫번째 자식의 margin-top 제거
});

globalStyle(`${editor} a`, {
  color: editorVar.border.active,
});
