import aws from "/public/assets/svg/aws.svg?url";
import jest from "/public/assets/svg/jest.svg?url";
import nestJS from "/public/assets/svg/nestjs.svg?url";
import nextJS from "/public/assets/svg/nextjs.svg?url";
import playwright from "/public/assets/svg/playwright.svg?url";
import postgres from "/public/assets/svg/postgres.svg?url";
import reactQuery from "/public/assets/svg/react-query.svg?url";
import storybook from "/public/assets/svg/storybook.svg?url";
import typescript from "/public/assets/svg/typescript.svg?url";
import vanillaExtract from "/public/assets/svg/vanilla-extract.svg?url";
import zustand from "/public/assets/svg/zustand.svg?url";
import Image from "next/image";
import Belt from "../belt";
import css from "../belt.module.scss";

const items = [
  { name: "TypeScript", src: typescript, color: "#017ACB" },
  { name: "Next.js", src: nextJS, color: "#333333" },
  { name: "Vanilla Extract", src: vanillaExtract, color: "#EB5E8E" },
  { name: "React Query", src: reactQuery, color: "#FF4154" },
  { name: "Zustand", src: zustand, color: "#685B4F" },
  { name: "Jest", src: jest, color: "#99425B" },
  { name: "Playwright", src: playwright, color: "#2EAD33" },
  { name: "Storybook", src: storybook, color: "#FF4785" },
  { name: "NestJS", src: nestJS, color: "#E0234E" },
  { name: "PostgreSQL", src: postgres, color: "#336791" },
  { name: "AWS", src: aws, color: "#252F3E" },
];

export default function TechBelt() {
  return (
    <Belt itemWidth={150}>
      {items.map((item) => {
        return (
          <div key={item.name} className={css.techBeltItem}>
            <Image src={item.src} alt={`${item.name}_symbol`} width={25} height={25} />
            <span style={{ color: item.color }}>{item.name}</span>
          </div>
        );
      })}
    </Belt>
  );
}
