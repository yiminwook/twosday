import classNames from "classnames";
import * as css from "./belt.css";
import React from "react";

interface BeltProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  duration?: number;
  itemWidth?: number;
  style?: React.CSSProperties;
}

export default function Belt({
  children,
  style,
  direction = "left",
  duration = 10,
  itemWidth = 100,
}: BeltProps) {
  const itemLength = Array.isArray(children) ? children.length : 1;

  return (
    <div
      className={css.wrap}
      style={
        {
          ...style,
          "--belt-item-length": itemLength,
          "--belt-item-width": `${itemWidth}px`,
          "--belt-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div className={classNames(css.row, direction)}>
        {[...Array(2)].map((_, i) => (
          // 요소를 복제하여 무한 스크롤링 효과를 줍니다.
          <div key={i}>{children}</div>
        ))}
      </div>
    </div>
  );
}
