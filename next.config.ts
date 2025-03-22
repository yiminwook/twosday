import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import NextBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";
import { SentryBuildOptions, withSentryConfig } from "@sentry/nextjs";
import path from "node:path";

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: ({ hash }) => `css_${hash}`,
});

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.NODE_ENV === "production",
  analyzerMode: "static",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
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
      @use "var";
      @use "util"; 
      @use "placeholder";
    `, // 위 파일은 import 하지 않아도 된다.
    silenceDeprecations: ["legacy-js-api"], // sass warning 제거
    logger: {
      warn: (message: any) => console.warn(message),
      debug: (message: any) => console.log(message),
    },
  },
  webpack: (config, { isServer }) => {
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"));
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

    if (isServer) {
      // next server build => ignore msw/browser
      if (Array.isArray(config.resolve.alias)) {
        // in Next the type is always object, so this branch isn't necessary. But to keep TS happy, avoid @ts-ignore and prevent possible future breaking changes it's good to have it
        config.resolve.alias.push({ name: "msw/browser", alias: false });
      } else {
        config.resolve.alias["msw/browser"] = false;
      }
    } else {
      // browser => ignore msw/node
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/node", alias: false });
      } else {
        config.resolve.alias["msw/node"] = false;
      }
    }

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
    authInterrupts: true, // 401, 403
    reactCompiler: true,
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"], // tree shaking
  },
};

const isEnableSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN && !!process.env.SENTRY_AUTH_TOKEN;

const SENTRY_BUILD_OPTIONS: SentryBuildOptions = {
  silent: !isEnableSentry, // Can be used to suppress logs
  org: "yisp",
  project: "twosday",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  telemetry: false, // Sentry 서비스 개선에 활용되지 않도록 설정
  autoInstrumentMiddleware: false,
  autoInstrumentAppDirectory: true,
  autoInstrumentServerFunctions: true,
  sourcemaps: {
    disable: true,
  },
};

export default withSentryConfig(
  withBundleAnalyzer(withVanillaExtract(nextConfig)),
  SENTRY_BUILD_OPTIONS,
);
