import Image from "next/image";
import timer from "@/assets/icons/timer.gif";

export default function Timer() {
  return (
    <div className="flex gap-5">
      <Image src={timer} alt="gif example" width={50} height={30} />
      <div className="flex items-center justify-center text-4xl">30</div>
    </div>
  );
}
