"use client";
import Giscus from "@giscus/react";
import { CommentCount, DiscussionEmbed } from "disqus-react";

export function GiscusComment() {
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

type DisqusProps = {
  identifier: string;
  url: string;
  title: string;
};

export function DisqusComment({ identifier, url, title }: DisqusProps) {
  return (
    <>
      {/* <CommentCount
        shortname={"twosday-live"}
        config={{
          url,
          identifier,
          title,
        }}
      >
        코멘트
      </CommentCount> */}

      <div style={{ colorScheme: "initial" }}>
        <DiscussionEmbed
          shortname={"twosday-live"}
          config={{
            url,
            identifier,
            title,
          }}
        />
      </div>
    </>
  );
}
