"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./components/Loading";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      router.push("/todos");
    } else {
      router.push("/login");
    }
  }, [status, router]);

  // 로딩 중일 때 표시할 내용
  return <Loading />;
}
