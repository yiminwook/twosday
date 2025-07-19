"use client";
import { SortableTree } from "@/components/category/sortable-tree";

export default function Page() {
  return (
    <div
      style={{
        maxWidth: 600,
        padding: 10,
        margin: "0 auto",
      }}
    >
      <SortableTree collapsible indicator removable />
    </div>
  );
}
