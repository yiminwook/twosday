"use client";
import RefCard from "@/components/ref-card/ref-card";
import css from "./ref-list.module.scss";
import { useRouter } from "next/navigation";
import { TReference } from "@/libraries/pg/references/references.dto";
import { Pagination } from "@mantine/core";

interface RefListProps {
  references: TReference[];
  currentPage: number;
  total: number;
}

export default function RefList({ references, total, currentPage }: RefListProps) {
  const router = useRouter();
  return (
    <>
      <div className={css.cardList}>
        {references.map((reference) => (
          <RefCard reference={reference} key={reference.id} />
        ))}
      </div>
      <div className={css.paginationBox}>
        <Pagination
          value={currentPage}
          total={total}
          size="sm"
          onChange={(page) => router.push(`/references?page=${page}`)}
        />
      </div>
    </>
  );
}
