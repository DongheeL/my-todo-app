"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Loading from "./Loading";

export default function LoginButton() {
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

  // 로딩 중이면 로딩 컴포넌트 표시
  if (isLoading) {
    return <Loading />;
  }

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer transition flex items-center"
      onClick={handleLogin}
      disabled={isLoading}
    >
      Google로 로그인
    </button>
  );
}
