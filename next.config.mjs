/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  // assetPrefix: isProd ? '/rahulkr-dev.github.io' : '',
  // basePath: isProd ? '/rahulkr-dev.github.io' : '',
  assetPrefix: "",
  basePath: "",
  output: "export",
  // Emits classic/index.html so the URL works on any static host.
  trailingSlash: true,
};

export default nextConfig;
