import ModalButton from "./ModalButton";

export default function ModalContainer({
  title,
  width,
  height,
  children,
}: modalProp) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 ">
      <div className="w-full h-full fixed bg-[rgba(0,0,0,0.5)]"></div>
      <div
        className={`relative flex flex-col ${width} ${height} rounded-4xl bg-[var(--color-second)] items-center justify-center opacity-90`}
      >
        <div className="absolute top-7 text-4xl">{title}</div>
        {children}
        <div className="absolute right-0 bottom-0 p-8">
          <ModalButton />
        </div>
      </div>
    </div>
  );
}
