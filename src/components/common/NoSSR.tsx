"use client";
import { useEffect, useState } from "react";

export default function NoSSR({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(() => true);
  }, []);

  return isClient ? children : null;
}
