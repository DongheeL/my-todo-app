import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// 인증 관련 로직을 관리하는 커스텀 훅
export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 로그아웃 최적화
  const handleSignOut = () => {
    // 먼저 로그인 페이지로 이동
    router.push("/login");

    // 백그라운드에서 로그아웃 처리
    setTimeout(() => {
      signOut({ redirect: false });
    }, 100);
  };

  return {
    session,
    status,
    handleSignOut,
  };
}
