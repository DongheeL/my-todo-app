"use client";

import { useAuth } from "../hooks/useAuth";
import SignOutButton from "./SignOutButton";

export default function UserDisplay() {
  const { session, status } = useAuth();

  // 로그인 여부와 관계없이 항상 동일한 구조의 UI를 반환하여 레이아웃 시프트 방지
  return (
    <>
      <span
        className={`font-semibold ${
          status === "loading" ? "text-gray-300 animate-pulse" : "text-blue-700"
        }`}
      >
        {status === "loading"
          ? "로딩 중..."
          : session?.user?.name
          ? `${session.user.name}님`
          : ""}
      </span>
      {/* 로그아웃 버튼은 인증 상태일 때만 표시, 그러나 공간은 항상 확보 */}
      {status !== "loading" && session ? (
        <SignOutButton />
      ) : (
        <div className="min-w-[68px]"></div>
      )}
    </>
  );
}
