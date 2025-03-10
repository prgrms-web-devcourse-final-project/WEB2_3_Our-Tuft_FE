import Image from "next/image";
import timer from "@/assets/icons/timer.gif";
import { useTimer } from "react-timer-hook";
import { useEffect } from "react";

export default function Timer({ quize }: { quize: string }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const { seconds, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => {},
  });

  useEffect(() => {
    if (quize) {
      const newTime = new Date();
      newTime.setSeconds(newTime.getSeconds() + 60);
      restart(newTime);
    }
  }, [quize]);

  return (
    <div className="flex gap-3 2xl:gap-5">
      <Image
        src={timer}
        alt="gif example"
        className="w-6 2xl:w-10 h-8 2xl:h-12"
      />
      <div className="flex items-center justify-center text-2xl 2xl:text-4xl">
        {seconds}
      </div>
    </div>
  );
}
