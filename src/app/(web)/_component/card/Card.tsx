"use client";
import Gravatar from "react-gravatar";
import Tag from "../tag/Tag";
import * as css from "./card.css";
import { faker } from "@faker-js/faker";

/* eslint-disable @next/next/no-img-element */
export default function Card() {
  const randomImg = Math.random() >= 0.5 ? faker.image.url() : "https://placehold.co/600x400";

  return (
    <article className={css.wrap}>
      <div className={css.imageBox}>
        <img className={css.image} src={randomImg} alt="placeholder_image" />
      </div>
      <div className={css.descBox}>
        <h4 className={css.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, nostrum
          odit molestias, nemo eaque beatae adipisci maxime ut necessitatibus quod, amet itaque
          deserunt atque quisquam vitae esse officiis a.
        </h4>
        <desc className={css.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, nostrum
          odit molestias, nemo eaque beatae adipisci maxime ut necessitatibus quod, amet itaque
          deserunt atque quisquam vitae esse officiis a.
        </desc>
        <div>
          <Gravatar email="grs0412@gmail.com" size={20} />
          <span className={css.editor}>작성자</span>
        </div>
        {/* <div className={css.tagBox}>
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
        </div> */}
      </div>
    </article>
  );
}
