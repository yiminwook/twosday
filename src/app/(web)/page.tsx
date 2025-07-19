import RefCard from "@/components/refCard/ref-card";
import Link from "next/link";
import AdBanner from "@/components/adBanner/AdBanner";
import CardSlider from "@/components/common/card/card-slider";
import HeroSection from "@/components/home/HeroSection";
import TechBelt from "@/components/home/TechBelt";
import PostsList from "@/components/post/post-list";
import { ResponsiveAdfit } from "@/components/adBanner/Adfit";
import { TGetPostsResponse } from "@/libraries/pg/posts/posts.type";
import { serverApi } from "@/apis/fetcher";
import { TGetReferencesResponse } from "@/libraries/pg/references/references.type";
import { CATEGORY_TAG, POST_TAG, REFERENCE_TAG, TAG_TAG, USER_TAG } from "@/constances";
import Intro from "@/components/home/intro";

// css
import css from "./page.module.scss";
import refListCss from "@/components/refCard/ref-list.module.scss";

const RECENT_POST_SIZE = 6;
const POPULAR_POST_SIZE = 6;
const REFERENCE_SIZE = 4;

// http://localhost:3000/api/revalidate/tag?name=home
export default async function Page() {
  const [popularJson, recentJson, referenceJson] = await Promise.all([
    // 5분 간격으로 캐시 갱신
    serverApi
      .get<TGetPostsResponse>(`posts?page=1&size=${POPULAR_POST_SIZE}&order=popular`, {
        next: { revalidate: 300, tags: [POST_TAG, TAG_TAG, CATEGORY_TAG, USER_TAG] },
      })
      .json(),
    serverApi
      .get<TGetPostsResponse>(`posts?page=1&size=${RECENT_POST_SIZE}&order=recent`, {
        next: { revalidate: 300, tags: [POST_TAG, TAG_TAG, CATEGORY_TAG, USER_TAG] },
      })
      .json(),
    serverApi
      .get<TGetReferencesResponse>(`references?page=1&size=${REFERENCE_SIZE}`, {
        next: { revalidate: 300, tags: [REFERENCE_TAG] },
      })
      .json(),
  ]);

  return (
    <main className={css.wrap}>
      <section className={css.section}>
        <Intro />
      </section>

      <section className={css.section}>
        <div className={css.sectionTitleBox}>
          <h2>인기 게시글</h2>
          <Link href="/posts?order=popluar">+ 더보기</Link>
        </div>
        <div className={css.cardSliderBox}>
          <CardSlider order="popular" post={popularJson.data.list} />
        </div>
      </section>

      <section className={css.section}>
        <div className={css.sectionTitleBox}>
          <h2>최근 게시글</h2>
          <Link href="/posts">+ 더보기</Link>
        </div>
        <div>
          <PostsList posts={recentJson.data.list} />
        </div>
      </section>

      <section className={css.section}>
        <div className={css.sectionTitleBox}>
          <h2>레퍼런스</h2>
          <Link href="/references">+ 더보기</Link>
        </div>
        <div className={refListCss.cardList}>
          {referenceJson.data.list.map((reference) => (
            <RefCard reference={reference} key={reference.id} />
          ))}
        </div>
      </section>

      {/* <div className={css.adBox}><ResponsiveAdfit /></div> */}

      {/* <div className={css.beltBox}><TechBelt /></div> */}

      {/* <AdBanner /> */}
    </main>
  );
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const fetchCache = "default-no-store";
export const dynamic = "force-dynamic"; // 최종배포시 제거필요
