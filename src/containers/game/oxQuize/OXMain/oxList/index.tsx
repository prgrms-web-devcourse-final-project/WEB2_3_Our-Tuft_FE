import Image from "next/image";
import OImg from "@/assets/images/O-img.png";
// import XImg from "@/assets/images/X-img.png";

export default function OXList() {
  return (
    <div className="absolute 2xl:-top-31 right-0 2xl:right-7">
      <Image src={OImg} alt="이미지" className="flex 2xl:w-32 w-18" />
    </div>
  );
}
