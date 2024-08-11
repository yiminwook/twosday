"use client";
import Gravatar from "react-gravatar";
import * as css from "./card.css";
import { Post } from "@/type/api";
import { format } from "date-fns";

interface CardProps {
  post: Post;
}

/* eslint-disable @next/next/no-img-element */
export default function Card({ post }: CardProps) {
  const updateTime = format(new Date(post.updatedAt), "yy년 MM월 dd일");
  return (
    <article className={css.wrap}>
      <div className={css.imageBox}>
        {post.thumbnail ? (
          <img className={css.image} src={post.thumbnail} alt="placeholder_image" />
        ) : (
          <div className={css.image}>
            <span className={css.placeholderText}>{post.title}</span>
          </div>
        )}
      </div>
      <div className={css.descBox}>
        <h4 className={css.title}>{post.title}</h4>
        <div className={css.editorBox}>
          <div className={css.avatarBox}>
            {post.author.avatar ? (
              <img src={post.author.avatar} alt="avatar" width={20} height={20} />
            ) : (
              <Gravatar email={post.author.email} size={20} />
            )}
          </div>
          <span className={css.editor}>{post.author.nickname}</span>
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
