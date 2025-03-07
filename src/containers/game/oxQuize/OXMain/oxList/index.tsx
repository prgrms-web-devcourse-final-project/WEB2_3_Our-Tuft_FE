import Image from "next/image";
import OImg from "@/assets/images/O-img.png";
import XImg from "@/assets/images/X-img.svg";

export default function OXList({ answer }: { answer?: boolean }) {
  if (answer === undefined || answer === null) return null;

  return (
    <div className="absolute 2xl:-top-33 right-1 md:right-2 2xl:right-7">
      {answer ? (
        <Image src={OImg} alt="O 이미지" className="flex 2xl:w-32 w-14" />
      ) : (
        <Image src={XImg} alt="X 이미지" className="flex 2xl:w-32 w-14" />
      )}
    </div>
  );
}
