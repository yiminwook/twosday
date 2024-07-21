import classNames from "classnames";
import { btn, wrap } from "./removable.css";
import { IoClose } from "react-icons/io5";

interface EditableTagProps {
  name: string;
  index: number;
  onClick?: (name: string) => void;
  onRemove?: (name: string) => void;
}

export default function Removable({ name, onClick, onRemove, index }: EditableTagProps) {
  return (
    <div className={classNames(wrap, onClick && "click")} onClick={() => onClick?.(name)}>
      <span>{name}</span>
      {onRemove && (
        <button
          className={btn}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
        >
          <IoClose size={14} color="#808080" />
        </button>
      )}
    </div>
  );
}
