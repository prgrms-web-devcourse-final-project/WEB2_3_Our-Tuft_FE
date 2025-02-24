import Image from "next/image";
import OImg from "@/assets/images/O-img.png";
import XImg from "@/assets/images/X-img.png";

export default function OXList() {
  return (
    <div className="absolute -top-31 ">
      <Image src={OImg} alt="이미지" className="flex w-32" />
    </div>
  );
}
