import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

interface CodeBlockProps {}

// node: {
//   attrs: { language: defaultLanguage },
// },

// updateAttributes,
// extension,
export default function CodeBlock({ ...props }: any) {
  console.log(props);
  return (
    <NodeViewWrapper className="code-block">
      {/* <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select> */}
      <pre spellCheck={false}>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
