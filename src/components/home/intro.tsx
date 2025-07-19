import { Button, Chip } from "@mantine/core";
import css from "./intro.module.scss";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import introImage from "/public/assets/images/intro.png";

export default function Intro() {
  return (
    <div className={css.wrap}>
      <div className={css.left}>
        <h2 className={css.title}>코드와 함께 성장하는 이야기.</h2>
        <p className={css.desc}>
          프론트엔드부터 백엔드, 그리고 데이터베이스까지. 개발의 다양한 영역을 탐험하며 얻은 지식과
          경험들을 이곳에 기록합니다.
          <br />
          코드를 통해 배우고, 고민을 해결하며, 함께 발전하는 우리의 솔직한 개발 여정을 만나보세요.
        </p>

        <div className={css.tagBox}>
          <Chip>React</Chip>
          <Chip>Next.js</Chip>
          <Chip>React Native</Chip>
        </div>

        <div className={css.buttonBox}>
          <Button>
            최신글 보기
            <ArrowRight className={css.recentButtonIcon} size={16} />
          </Button>
          <Button variant="outline">Contact me</Button>
        </div>
      </div>

      <div className={css.right}>
        <div className={css.imageBox}>
          <Image src={introImage} alt="intro" fill />
        </div>
      </div>
    </div>
  );
}
