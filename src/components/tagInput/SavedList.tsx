import { useQuery } from "@tanstack/react-query";
import * as css from "./savedList.css";
import { getWasUrl } from "@/utils/getWasUrl";
import { useMemo } from "react";

interface SavedListProps {
  onEdit?: (name: string) => void;
  onClickRemovable: (name: string) => void;
}

export default function SavedList({ onEdit, onClickRemovable }: SavedListProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ["/api/twosday/tag"],
    queryFn: async () => {
      const res = await fetch(`${getWasUrl()}/api/twosday/tag`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body: { data: { tags: { id: number; name: string }[] }; message: string[] } =
        await res.json();

      if (!res.ok) {
        throw new Error(body.message[0]);
      }

      return body;
    },
  });

  const filtered = useMemo(() => {
    return [];
  }, [data]);

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (error) {
    throw error;
  }

  return (
    <ul className={css.list}>
      {filtered.map((name) => (
        <li key={name} className={css.row}>
          <span key={`saved_${name}`} className={css.span} onClick={() => onClickRemovable(name)}>
            {name}
          </span>
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
