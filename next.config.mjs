/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phimimg.com", // Thay thế domain ở đây
        pathname: "/**", // Cho phép tất cả đường dẫn hình ảnh từ domain này
      },
    ],
  },
};

export default nextConfig;
