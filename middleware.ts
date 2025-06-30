import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// 토큰 검증 캐싱을 위한 Map (간단한 메모리 캐시)
const tokenCache = new Map();

// 환경에 따른 세션 쿠키 이름 결정
const getSessionCookieName = (req: NextRequest): string => {
  // Vercel 프로덕션 환경에서는 secure 쿠키 사용
  const isSecure =
    req.headers.get("x-forwarded-proto") === "https" ||
    process.env.NODE_ENV === "production";
  return isSecure
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
};

export async function middleware(request: NextRequest) {
  const cookieName = getSessionCookieName(request);
  const sessionId = request.cookies.get(cookieName)?.value;

  // 캐시된 토큰이 있는지 확인
  let token;
  if (sessionId && tokenCache.has(sessionId)) {
    token = tokenCache.get(sessionId);
  } else {
    // 캐시에 없으면 새로 검증
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 토큰이 있으면 캐시에 저장 (1시간간 유효)
    if (sessionId && token) {
      tokenCache.set(sessionId, token);
      setTimeout(() => tokenCache.delete(sessionId), 60 * 60 * 1000);
    }
  }

  // 보호된 경로 검증 - 로그인 진행 중 상태는 클라이언트에서만 확인 가능하므로
  // 미들웨어에서의 리다이렉트 처리는 최소화
  if (request.nextUrl.pathname.startsWith("/todos")) {
    if (!token) {
      // 단, 로그인 페이지로는 리다이렉트 (클라이언트에서 처리하기 전에)
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(url);
    }
  }

  // 로그인 페이지 리다이렉션
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(new URL("/todos", request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ["/todos/:path*", "/login"],
};
