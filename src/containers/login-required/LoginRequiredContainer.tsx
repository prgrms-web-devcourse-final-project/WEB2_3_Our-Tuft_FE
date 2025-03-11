"use client";
import { useRouter } from "next/navigation";

export default function LoginRequiredContainer() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.replace("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-main)]/90">
      <div className="bg-[#e6f7fc] p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">로그인이 필요합니다</h2>
        <p className="mb-4">로그인 시 이용 가능합니다.</p>
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 bg-[var(--color-second)]/90 hover:bg-[var(--color-second-hover)] text-white rounded cursor-pointer"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
