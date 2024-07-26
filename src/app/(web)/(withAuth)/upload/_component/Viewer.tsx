import parse from "html-react-parser";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  return (
    <div className="ql-snow">
      <div className="ql-editor">{parse(content)}</div>
    </div>
  );
}
