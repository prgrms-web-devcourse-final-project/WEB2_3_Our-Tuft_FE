import { modalProp } from "../../types/modalType";

export default function ModalContainer({
  title,
  width,
  height,
  children,
  setIsClose,
  className,
}: modalProp & { setIsClose?: (val: boolean) => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 ">
      <div
        className="w-full h-full fixed bg-[rgba(0,0,0,0.5)]"
        onClick={() => setIsClose?.(false)}
      ></div>
      <div
        className={`relative flex flex-col ${className} ${width} ${height} rounded-4xl bg-[var(--color-second)] items-center justify-center opacity-90`}
      >
        <div className="absolute top-7 xl:text-4xl text-2xl text-white">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
