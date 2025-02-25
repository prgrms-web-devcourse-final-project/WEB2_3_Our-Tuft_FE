import Image from "next/image";
import timer from "@/assets/icons/timer.gif";

export default function Timer() {
  return (
    <div className="flex gap-3 2xl:gap-5">
      <Image
        src={timer}
        alt="gif example"
        className="w-6 2xl:w-10 h-8 2xl:h-12"
      />
      <div className="flex items-center justify-center text-2xl 2xl:text-4xl">
        30
      </div>
    </div>
  );
}
