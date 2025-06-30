import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 인증 관련 경로에 대한 캐싱 전략 설정
  async headers() {
    return [
      {
        source: "/api/auth/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },

  // 이미지 최적화 (로딩 시간 개선)
  images: {
    domains: ["lh3.googleusercontent.com"], // Google 프로필 이미지 도메인
  },
};

export default nextConfig;
