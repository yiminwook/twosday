"use client";
import { useEffect, useRef } from "react";

type Props = {
  unit: string;
  width: number;
  height: number;
};

export default function KakaoAdFit({ unit, width, height }: Props) {
  const scriptElementWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://t1.daumcdn.net/kas/static/ba.min.js");
    scriptElementWrapper.current?.appendChild(script);

    return () => {
      const globalAdfit = window.adfit;
      if (globalAdfit) globalAdfit.destroy(unit);
    };
  }, []);

  return (
    <div ref={scriptElementWrapper}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unit}
        data-ad-width={width}
        data-ad-height={height}
      ></ins>
    </div>
  );
}
