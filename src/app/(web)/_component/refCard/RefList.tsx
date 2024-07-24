import RefCard from "@web/_component/refCard/RefCard";
import { Reference } from "@web/(anyAuth)/reference/_lib/ref.type";
import { wrap } from "./refList.css";

interface RefListProps {
  references: Reference[];
}

export default function RefList({ references }: RefListProps) {
  return (
    <div className={wrap}>
      {references.map((reference) => (
        <RefCard reference={reference} key={reference.id} />
      ))}
    </div>
  );
}
