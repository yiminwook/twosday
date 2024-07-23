import Removable from "./Removable";
import * as css from "./savedList.css";

interface SavedListProps {
  saved: string[];
  onEdit?: (name: string) => void;
  onClickRemovable: (name: string) => void;
}

export default function SavedList({ saved, onEdit, onClickRemovable }: SavedListProps) {
  return (
    <ul className={css.list}>
      {saved.map((name, index) => (
        <li key={name} className={css.row}>
          <Removable key={`saved_${name}`} name={name} index={index} onClick={onClickRemovable} />
          {onEdit && (
            <button type="button" className={css.editButton} onClick={() => onEdit(name)}>
              ...
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
