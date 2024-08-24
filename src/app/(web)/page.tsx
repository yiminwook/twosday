import { getWasUrl } from "@/app/_lib/getWasUrl";
import { Post } from "@/type/api";
import RefCard from "@web/_component/refCard/RefCard";
import Link from "next/link";
import AdBanner from "./_component/adBanner/AdBanner";
import CardSlider from "./_component/card/CardSlider";
import HeroSection from "./_component/home/HeroSection";
import TechBelt from "./_component/home/TechBelt";
import { Reference } from "./reference/_lib/ref.type";

// css
import "@/style/swiper/swiper.css";
import "@/style/swiper/pagination.css";
import * as css from "./page.css";
import { cardList } from "@web/_component/refCard/refList.css";

export default async function Page() {
  const [popularPostResponse, recentPostResponse, referenceResponse] = await Promise.all([
    fetch(`${getWasUrl()}/api/twosday/post?page=1&size=6&order=popular`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300, tags: ["home", "post"] }, //1분 간격으로 캐시 갱신
    }),
    fetch(`${getWasUrl()}/api/twosday/post?page=1&size=6&order=recent`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300, tags: ["home", "post"] }, //1분 간격으로 캐시 갱신
    }),
    fetch(`${getWasUrl()}/api/twosday/reference?page=1&size=4`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300, tags: ["home", "reference"] }, //1분 간격으로 캐시 갱신
    }),
  ]);

  const popularBody: {
    data: { post: Post[]; total: number; size: number };
    message: string[];
  } = await popularPostResponse.json();

  const recentBody: {
    data: { post: Post[]; total: number; size: number };
    message: string[];
  } = await recentPostResponse.json();

  const referenceBody: {
    data: { reference: Reference[]; total: number; size: number };
    message: string[];
  } = await referenceResponse.json();

  return (
    <main className={css.wrap}>
      <HeroSection />
      <section className={css.section}>
        <div className={css.sectionTitleBox}>
          <h2>인기 게시글</h2>
          <Link href="/post?order=popluar">+ 더보기</Link>
        </div>
        <div className={css.cardSliderBox}>
          <CardSlider order="popular" post={popularBody.data.post} />
        </div>
      </section>
      <section className={css.section}>
        <div className={css.sectionTitleBox}>
          <h2>최근 게시글</h2>
          <Link href="/post">+ 더보기</Link>
        </div>
        <div>
          <CardSlider order="recent" post={recentBody.data.post} />
        </div>
      </section>
      <div className={css.beltBox}>
        <TechBelt />
      </div>
      <section className={css.section}>
        <div className={css.sectionTitleBox}>
          <h2>레퍼런스</h2>
          <Link href="/reference">+ 더보기</Link>
        </div>
        <div className={cardList}>
          {referenceBody.data.reference.map((reference) => (
            <RefCard reference={reference} key={reference.id} />
          ))}
        </div>
      </section>
      <AdBanner />
    </main>
  );
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const fetchCache = "default-no-store";
