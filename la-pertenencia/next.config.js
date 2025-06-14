/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@heroui/theme",
    "@heroui/system",
    "@heroui/button",
    "@heroui/card",
    "@heroui/input",
    "@heroui/navbar",
    "@heroui/link",
    "@heroui/modal",
    "@heroui/table",
    "@heroui/code",
    "@heroui/kbd",
    "@heroui/listbox",
    "@heroui/snippet",
    "@heroui/spacer",
    "@heroui/switch",
    "@heroui/divider",
    "@heroui/image",
  ],
  experimental: {
    optimizePackageImports: ["@heroui/theme", "@heroui/system"],
  },
};

module.exports = nextConfig
