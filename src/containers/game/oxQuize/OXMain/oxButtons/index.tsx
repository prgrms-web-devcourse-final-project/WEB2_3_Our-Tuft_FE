import Image from "next/image";
import OImg from "@/assets/images/O-img.png";
import XImg from "@/assets/images/X-img.svg";

export default function OXButtons() {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[69%] 2xl:bottom-[56%] flex gap-3 z-30">
      <div className="relative flex items-center justify-center bg-white rounded-xl w-20 h-20 2xl:w-32 2xl:h-32 opacity-90 drop-shadow-custom">
        <div className="absolute top-2 right-2 text-black text-xl font-bold hidden 2xl:block">
          F1
        </div>
        <Image src={OImg} alt="O 이미지" className="w-28" />
      </div>

      <div className="relative flex items-center justify-center bg-white rounded-xl w-20 h-20 2xl:w-32 2xl:h-32 opacity-90 drop-shadow-custom">
        <div className="absolute top-2 right-2 text-black text-xl font-bold hidden 2xl:block">
          F2
        </div>
        <Image src={XImg} alt="X 이미지" className="2xl:w-20 w-16" />
      </div>
    </div>
  );
}
