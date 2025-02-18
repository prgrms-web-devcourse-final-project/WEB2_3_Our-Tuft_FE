import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex gap-2">
        <div className=" bg-[var(--color-main)]">Main 색상</div>
        <div className=" bg-[var(--color-second)]">Second 색상</div>
        <div className="bg-[var(--color-point)]">Point 색상</div>
        <div className=" bg-[var(--color-secondPoint)]">SecondPoint 색상</div>
        <div className=" bg-[var(--color-amberOrange)]">amberOrange 색상</div>
        <div className=" bg-[var(--color-ligthRed)]">ligthRed 색상</div>
      </div>
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Link href="/login">로그인</Link>
        <Link href="/lobby">로비</Link>
        <Link href="/shop">포인트 상점</Link>
        <Link href="/game">게임 화면</Link>
        <Link href="/my">프로필 편집</Link>
      </div>
    </>
  );
}
