"use client";
import Giscus from "@giscus/react";

export default function Comment() {
  return (
    <Giscus
      repo="twos-day/one-for-all"
      repoId="R_kgDOMe0vvQ"
      category="comment"
      categoryId="DIC_kwDOMe0vvc4Ch6Ff"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang="ko"
      loading="lazy"
    />
  );
}
