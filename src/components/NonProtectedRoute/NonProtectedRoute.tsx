"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginStore } from "../../store/store";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function NonProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useLoginStore((state) => state.token);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      // 상태 업데이트
      useLoginStore.getState().login(storedToken);
    }
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (isAuthChecked && token) {
      router.replace("/lobby"); // 로그인 상태면 /lobby로 이동
    } else {
      setIsAuthChecked(true);
    }
  }, [isAuthChecked, token, router]);

  // 깜빡임 방지
  if (!isAuthChecked) return <LoadingSpinner />;
  if (token) return <LoadingSpinner />;

  return <>{children}</>;
}
