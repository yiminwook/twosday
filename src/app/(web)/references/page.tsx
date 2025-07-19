import RefList from "@/components/ref-card/ref-list";
import Nav from "@/components/reference/nav";
import { REFERENCE_PAGE_SIZE, REFERENCE_TAG } from "@/constants";
import css from "./page.module.scss";
import { serverApi } from "@/apis/fetcher";
import { TGetReferencesResponse } from "@/libraries/pg/references/references.type";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) || 1 : 1;

  const json = await serverApi
    .get<TGetReferencesResponse>(`references?page=${page}&size=${REFERENCE_PAGE_SIZE}`, {
      next: { revalidate: 300, tags: [REFERENCE_TAG] }, //5분 간격으로 캐시 갱신
    })
    .json();

  return (
    <div className={css.wrap}>
      <Nav />
      <div className={css.listWrap}>
        <RefList
          references={json.data.list}
          currentPage={page}
          total={Math.ceil(json.data.total / REFERENCE_PAGE_SIZE)}
        />
      </div>
    </div>
  );
}
