"use client";
import gravatar from "gravatar";
import css from "./card.module.scss";
import { useRouter } from "next/navigation";
import dayjs from "@/libraries/dayjs";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";
import PlaceholderImage from "/public/assets/images/neon-512x512.png";
import Image from "next/image";
import { Avatar } from "@mantine/core";

interface CardProps {
  post: TPublicPost;
}

/* eslint-disable @next/next/no-img-element */
export default function Card({ post }: CardProps) {
  const router = useRouter();
  const updateTime = dayjs(post.updatedAt).format("yy년 MM월 dd일");
  const onClick = () => router.push(`/posts/${post.postId}`);
  return (
    <article className={css.wrap}>
      <div className={css.imageBox} onClick={onClick}>
        <Image className={css.image} src={PlaceholderImage} alt="placeholder_image" />
        {/* {post.thumbnail ? (
          // <img className={css.image} src={post.thumbnail} alt="placeholder_image" />
        ) : ( */}
        {/* <div className={css.image}>
          <span className={css.placeholderText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos temporibus aspernatur
            ipsam libero obcaecati. Commodi optio recusandae enim quis beatae non quas quam vitae
            quaerat, atque eos repudiandae, necessitatibus ab.
          </span>
        </div> */}
        {/* )} */}
      </div>
      <div className={css.descBox}>
        <h4 className={css.title} onClick={onClick}>
          {post.title}
        </h4>
        <div className={css.authorBox}>
          <Avatar
            className={css.avatar}
            src={post.avatar ?? gravatar.url(post.email, { s: "20px", d: "retro" })}
            alt={post.nickname}
            radius="lg"
            size={20}
          />
          <span className={css.editor}>{post.nickname}</span>
        </div>
        <div className={css.timeBox}>
          <time>{updateTime}</time>
        </div>
        {/* <div className={css.tagBox}>
          <Tag name="태그1" />
          <Tag name="태그2" />
        </div> */}
      </div>
    </article>
  );
}
