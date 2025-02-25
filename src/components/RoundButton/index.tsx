export default function RoundButton({
  width,
  height,
  bgColor,
  text,
  onClick,
  className,
}: {
  width?: string;
  height?: string;
  bgColor?: string;
  text?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center ${width} ${height} ${bgColor} ${className} opacity-90 rounded-3xl 2xl:rounded-[10px] drop-shadow-custom cursor-pointer hover:opacity-100`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
