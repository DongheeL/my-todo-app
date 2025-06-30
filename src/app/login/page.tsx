"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import Loading from "../components/Loading";

// useSearchParams를 사용하는 클라이언트 컴포넌트를 분리합니다
function LoginContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/todos";

  // 로그인 처리 함수
  const handleLogin = async () => {
    setIsLoading(true);

    // 인증 진행 (인증이 완료될 때까지 기다리지 않고 UI 상태만 변경)
    signIn("google", {
      callbackUrl,
      redirect: true, // 인증 성공 후 자동으로 리다이렉트
    });
  };

  // 로딩 중이면 전체 페이지가 Loading 컴포넌트로 대체됨
  if (isLoading) {
    return <Loading />;
  }

  // 로그인 버튼 화면 출력
  return (
    <div className="w-full max-w-md flex flex-col items-center mb-8">
      <div className="flex items-center gap-3 mb-2">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" fill="#a78bfa" />
          <path
            d="M8 12.5l2.5 2.5L16 9"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-3xl font-extrabold text-purple-700 drop-shadow">
          My Todo App
        </span>
      </div>
      <p className="text-gray-500 text-center text-base font-medium mb-8">
        Google 계정으로 로그인해서
        <br />
        나만의 할 일 목록을 관리해보세요!
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer transition flex items-center"
        onClick={handleLogin}
        disabled={isLoading}
      >
        Google로 로그인
      </button>
    </div>
  );
}

// Suspense 경계로 감싸진 페이지 컴포넌트
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center py-10 px-2">
      <Suspense fallback={<Loading />}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
