"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// 최적화된 SessionProvider 컴포넌트
export function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <NextAuthSessionProvider
      // 세션 설정 최적화
      refetchInterval={0} // 5분마다 세션 갱신 (기본값은 더 짧음)
      refetchOnWindowFocus={false} // 창 포커스 시 새로고침 방지
    >
      {children}
    </NextAuthSessionProvider>
  );
}
