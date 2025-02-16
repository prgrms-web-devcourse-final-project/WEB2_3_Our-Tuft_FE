import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/login">로그인</Link>
      <Link href="/lobby">로비</Link>
      <Link href="/shop">포인트 상점</Link>
      <Link href="/game">게임 화면</Link>
    </div>
  );
}

// 애초에

// 1. 대기실 -

// 2. 게임 페이지
//   - 조건 걸어서 렌더링?

//   2-1. OX 퀴즈
//   2-2. 스피드 퀴즈
//   2-3. 캐치마인드
