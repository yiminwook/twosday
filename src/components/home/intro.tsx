import { Button, Chip } from "@mantine/core";
import css from "./intro.module.scss";
import { ArrowRight } from "lucide-react";

export default function Intro() {
  return (
    <section className={css.wrap}>
      <div className={css.left}>
        <h2 className={css.title}>안녕하세요</h2>
        <h3 className={css.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores excepturi unde, dolores
          facere reiciendis molestiae harum eveniet, iste quibusdam, voluptate distinctio
          exercitationem earum rerum iusto voluptas quod neque recusandae beatae.
        </h3>

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
          <div className={css.image}>이미지</div>
        </div>
      </div>
    </section>
  );
}
