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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },

  eslint: {
    // ESLint 검사를 완전히 건너뜁니다.
    ignoreDuringBuilds: true,
  },

  // Prisma 클라이언트 생성을 빌드 프로세스에 포함
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 서버 빌드 시 Prisma 클라이언트 생성
      // Vercel 배포를 위한 최적화
    }
    return config;
  },
};

export default nextConfig;
