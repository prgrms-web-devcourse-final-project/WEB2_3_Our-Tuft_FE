import Link from "next/link";

export default function Game() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/game/oxquiz">OX 퀴즈</Link>
      <Link href="/game/speedquiz">스피드 퀴즈</Link>
      <Link href="/game/drawingquiz">캐치마인드</Link>
    </div>
  );
}
