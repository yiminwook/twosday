"use client";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

type Props = {
  unit: string;
  width: number;
  height: number;
};

export function KakaoAdFit({ unit, width, height }: Props) {
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

export function MediaKakaoAdfit() {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(() => true);
  }, []);

  if (!isMount) return null;

  return isMobile ? (
    <KakaoAdFit width={320} height={250} unit="DAN-ES71g0m2rjta1wHl" />
  ) : (
    <KakaoAdFit width={728} height={90} unit="DAN-CScUcNvZZ5M7SER1" />
  );
}
