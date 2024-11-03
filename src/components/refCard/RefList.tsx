"use client";
import RefCard from "@/components/refCard/RefCard";
import { Reference } from "@/types/ref";
import { cardList } from "./refList.css";
import PagePagination from "@/components/common/pagination/PagePagination";
import { useRouter } from "next/navigation";

interface RefListProps {
  references: Reference[];
  currentPage: number;
  total: number;
  size: number;
}

export default function RefList({ references, total, currentPage, size }: RefListProps) {
  const router = useRouter();
  return (
    <>
      <div className={cardList}>
        {references.map((reference) => (
          <RefCard reference={reference} key={reference.id} />
        ))}
      </div>
      <PagePagination
        currentPage={currentPage}
        totalCnt={total}
        pgSize={size}
        onChange={(page) => router.push(`/reference?page=${page}`)}
      />
    </>
  );
}
