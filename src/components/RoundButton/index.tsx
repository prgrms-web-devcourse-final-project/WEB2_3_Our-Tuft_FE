import Image from "next/image";

export default function RoundButton({
  width,
  height,
  bgColor,
  text,
  url,
  onClick,
  className,
}: {
  width?: string;
  height?: string;
  bgColor?: string;
  text: string;
  url?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center ${width} ${height} ${bgColor} ${className} opacity-90 rounded-[12px] 2xl:rounded-[12px] drop-shadow-custom cursor-pointer hover:opacity-100`}
      onClick={onClick}
    >
      {url ? (
        <Image
          src={url}
          alt={text}
          className="w-8 h-8 2xl:w-9 2xl:h-9"
          width={38}
          height={38}
        />
      ) : (
        text
      )}
    </div>
  );
}
