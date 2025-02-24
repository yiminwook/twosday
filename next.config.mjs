import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import path from "path";

const __dirname = path.resolve();

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: ({ hash }) => `css_${hash}`,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // ts빌드 에러를 무시하고 싶다면 아래 옵션을 true로 변경하세요.
    ignoreBuildErrors: false,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")], // styles 폴더에 있는 파일은 이름만으로 import 가능(경로 축약)
    prependData: `
      @use "var.scss";
      @use "util.scss"; 
    `, // 위 파일은 import 하지 않아도 된다.
    silenceDeprecations: ["legacy-js-api"], // sass warning 제거
    logger: {
      warn: (message) => console.warn(message),
      debug: (message) => console.log(message),
    },
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  images: {
    unoptimized: false, //과금방지
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.twosday.live",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "ads-partners.coupang.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"], // tree shaking
  },
};

export default withVanillaExtract(nextConfig);
