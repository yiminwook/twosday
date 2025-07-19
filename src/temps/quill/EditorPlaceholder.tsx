import clsx from "clsx";
import { loading } from "./editor.css";
import LoadingSpinner from "@/app/_component/loading/LoadingSpinner";

export default function EditorPlaceholder() {
  return (
    <div className={clsx("quill", loading)}>
      <div className="ql-container ql-snow">
        <LoadingSpinner style={{ width: 56, height: 56 }} />
      </div>
    </div>
  );
}
