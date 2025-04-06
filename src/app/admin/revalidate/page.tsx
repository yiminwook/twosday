"use client";
import { revalidateApi } from "@/apis/fetcher";
import { CATEGORY_TAG, META_TAG, POST_TAG, REFERENCE_TAG, TAG_TAG, USER_TAG } from "@/constances";
import { Button, LoadingOverlay, Table } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { MouseEvent } from "react";
import { toast } from "sonner";
import css from "./page.module.scss";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "/api/revalidate/tag?name=";

export default function Page() {
  const mutationRevalidate = useMutation({
    mutationFn: async ({ tag }: { tag: string }) => {
      await revalidateApi.get(`tag?name=${tag}`);
    },
    onSuccess: (data, arg) => {
      toast.success("갱신 되었습니다. tag - " + arg.tag);
    },
    onError: (error, arg) => {
      toast.error(`갱신이 실패되었습니다. ${arg.tag}: ${error.message}`);
    },
  });

  const onClick = (e: MouseEvent<HTMLTableSectionElement>) => {
    if (mutationRevalidate.isPending) return;

    const target = e.target as HTMLElement;
    const tag = target.closest("button")?.dataset.tag;

    if (tag) {
      console.log(tag);
      mutationRevalidate.mutate({ tag });
    }
  };
  return (
    <section className={css.wrap}>
      <h2>TagName으로 캐시갱신</h2>

      <div className={css.tableBox}>
        <Table className={css.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>TYPE</Table.Th>
              <Table.Th>URL</Table.Th>
              <Table.Th>RESET</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody onClick={onClick}>
            <Table.Tr>
              <Table.Th>USER</Table.Th>
              <Table.Td>{BASE_URL + API_URL + USER_TAG}</Table.Td>
              <Table.Td>
                <Button size="sm" variant="default" mod={{ tag: USER_TAG }}>
                  RESET
                </Button>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>POST</Table.Th>
              <Table.Td>{BASE_URL + API_URL + POST_TAG}</Table.Td>
              <Table.Td>
                <Button size="sm" variant="default" mod={{ tag: POST_TAG }}>
                  RESET
                </Button>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>TAG</Table.Th>
              <Table.Td>{BASE_URL + API_URL + TAG_TAG}</Table.Td>
              <Table.Td>
                <Button size="sm" variant="default" mod={{ tag: TAG_TAG }}>
                  RESET
                </Button>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>CATEGORY</Table.Th>
              <Table.Td>{BASE_URL + API_URL + CATEGORY_TAG}</Table.Td>
              <Table.Td>
                <Button size="sm" variant="default" mod={{ tag: CATEGORY_TAG }}>
                  RESET
                </Button>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>REFERENCE</Table.Th>
              <Table.Td>{BASE_URL + API_URL + REFERENCE_TAG}</Table.Td>
              <Table.Td>
                <Button size="sm" variant="default" mod={{ tag: REFERENCE_TAG }}>
                  RESET
                </Button>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>META</Table.Th>
              <Table.Td>{BASE_URL + API_URL + META_TAG}</Table.Td>
              <Table.Td>
                <Button size="sm" variant="default" mod={{ tag: META_TAG }}>
                  RESET
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

        <LoadingOverlay
          visible={mutationRevalidate.isPending}
          zIndex={100}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "var(--mantine-color-primary-3)", type: "bars" }}
        />
      </div>
    </section>
  );
}
