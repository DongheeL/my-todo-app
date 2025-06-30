"use client";

import { useAuth } from "../hooks/useAuth";

export default function SignOutButton() {
  const { handleSignOut } = useAuth();

  return (
    <button
      className="min-w-[68px] text-center px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg hover:cursor-pointer transition"
      onClick={handleSignOut}
    >
      로그아웃
    </button>
  );
}
