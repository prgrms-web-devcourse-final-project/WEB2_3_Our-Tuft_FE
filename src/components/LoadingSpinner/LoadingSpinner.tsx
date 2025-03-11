import Image from "next/image";
import loadingImg from "@/assets/images/loading.gif";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-60">
      <div
        className="w-full h-full fixed"
        style={{
          backgroundImage: "url('/assets/images/bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      ></div>
      <div
        className={`relative flex flex-colrounded-4xl items-center justify-center opacity-90`}
      >
        <Image src={loadingImg} alt="로딩 이미지" />
      </div>
    </div>
  );
}
