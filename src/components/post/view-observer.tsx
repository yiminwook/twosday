"use client";
import { clientApi } from "@/apis/fetcher";
import { memo, useEffect } from "react";

type Props = {
  postId: number;
};

export default memo(function ViewObserver({ postId }: Props) {
  useEffect(() => {
    clientApi.post(`posts/${postId}/view`);
  }, [postId]);

  return null;
});
