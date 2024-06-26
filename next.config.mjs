import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    const imgUrl = process.env.AWS_CLOUD_FRONT_URL + "/:path*";
    const wasUrl =
      process.env.NEXT_PUBLIC_WAS_PROTOCOL + "://" + process.env.NEXT_PUBLIC_WAS_DOMAIN;

    return {
      beforeFiles: [
        {
          source: "/img/:path*",
          destination: imgUrl,
        },
        {
          source: "/was/:path*",
          destination: wasUrl + "/api/:path*",
        },
      ],
    };
  },
};
export default withVanillaExtract(nextConfig);
