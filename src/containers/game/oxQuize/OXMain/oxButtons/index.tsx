import Image from "next/image";
import OImg from "@/assets/images/O-img.png";
import XImg from "@/assets/images/X-img.png";

export default function OXButtons() {
  return (
    <div className="absolute bottom-[56%] left-[43%] flex gap-3 z-30">
      <div className="relative flex items-center justify-center bg-white rounded-xl w-32 h-32 opacity-90 drop-shadow-custom">
        <div className="absolute top-2 right-2 text-black text-xl font-bold">
          F1
        </div>
        <Image src={OImg} alt="O 이미지" className="w-28" />
      </div>

      <div className="relative flex items-center justify-center bg-white rounded-xl w-32 h-32 opacity-90 drop-shadow-custom">
        <div className="absolute top-2 right-2 text-black text-xl font-bold">
          F2
        </div>
        <Image src={XImg} alt="X 이미지" className="w-28" />
      </div>
    </div>
  );
}
