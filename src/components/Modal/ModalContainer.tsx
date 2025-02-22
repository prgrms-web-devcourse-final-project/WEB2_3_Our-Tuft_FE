export default function ModalContainer({
  title,
  width,
  height,
  children,
  isClose,
}: modalProp & { isClose: (val: boolean) => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 ">
      <div
        className="w-full h-full fixed bg-[rgba(0,0,0,0.5)]"
        onClick={() => isClose(false)}
      ></div>
      <div
        className={`relative flex flex-col ${width} ${height} rounded-4xl bg-[var(--color-second)] items-center justify-center opacity-90`}
      >
        <div className="absolute top-7 text-4xl">{title}</div>
        {children}
      </div>
    </div>
  );
}
