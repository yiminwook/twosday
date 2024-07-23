import Tag from "../tag/Tag";
import * as css from "./card.css";

/* eslint-disable @next/next/no-img-element */
export default function Card() {
  return (
    <article className={css.wrap}>
      <div className={css.imageBox}>
        <img className={css.image} src="https://placehold.co/600x400" alt="placeholder_image" />
      </div>
      <div className={css.desc}>
        <h4 className={css.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, nostrum
          odit molestias, nemo eaque beatae adipisci maxime ut necessitatibus quod, amet itaque
          deserunt atque quisquam vitae esse officiis a.
        </h4>
        <div className={css.tagBox}>
          <Tag name="태그1" />
          <Tag name="태그2" />
          <Tag name="태그3" />
          <Tag name="태그4" />
          <Tag name="태그5" />
          <Tag name="태그6" />
          <Tag name="태그7" />
          <Tag name="태그8" />
          <Tag name="태그9" />
          <Tag name="태그1" />
          <Tag name="태그2" />
          <Tag name="태그3" />
          <Tag name="태그7" />
          <Tag name="태그8" />
          <Tag name="태그9" />
          <Tag name="태그1" />
          <Tag name="태그2" />
          <Tag name="태그3" />
        </div>
      </div>
    </article>
  );
}
