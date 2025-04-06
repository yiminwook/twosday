"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("test", error);
  }, [error]);

  return (
    <div>
      <h3>{error.message}</h3>
      <Button onClick={router.back}>돌아가기</Button>
    </div>
  );
}
