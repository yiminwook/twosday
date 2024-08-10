import Belt from "./Belt";
import typescript from "@/asset/svg/typescript.svg?url";
import nextJS from "@/asset/svg/nextjs.svg?url";
import vanillaExtract from "@/asset/svg/vanilla-extract.svg?url";
import reactQuery from "@/asset/svg/react-query.svg?url";
import zustand from "@/asset/svg/zustand.svg?url";
import jest from "@/asset/svg/jest.svg?url";
import playwright from "@/asset/svg/playwright.svg?url";
import storybook from "@/asset/svg/storybook.svg?url";
import nestJS from "@/asset/svg/nestjs.svg?url";
import postgres from "@/asset/svg/postgres.svg?url";
import aws from "@/asset/svg/aws.svg?url";
import Image from "next/image";
import { techBeltItem } from "./belt.css";

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
          <div key={item.name} className={techBeltItem}>
            <Image src={item.src} alt={`${item.name}_symbol`} width={25} height={25} />
            <span style={{ color: item.color }}>{item.name}</span>
          </div>
        );
      })}
    </Belt>
  );
}
