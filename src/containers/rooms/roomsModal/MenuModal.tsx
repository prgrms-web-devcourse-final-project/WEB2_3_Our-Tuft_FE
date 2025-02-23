import { createPortal } from "react-dom";

export default function MenuModal({
  setIsClose,
  position,
  openProfileModal,
}: {
  setIsClose: (val: boolean) => void;
  position: { x: number; y: number } | null;
  openProfileModal: (val: boolean) => void;
}) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div
        className="w-full h-full fixed bg-[rgba(0,0,0,0.5)]"
        onClick={() => setIsClose(false)}
      ></div>
      <div
        className="flex flex-col items-center fixed bg-[var(--color-point)] rounded-xl text-[16px] cursor-pointer opacity-90"
        style={{ top: position?.y ?? 0, left: position?.x ?? 0 }}
      >
        <div
          className="w-full h-full px-18 py-3  text-center hover:bg-[var(--color-point-hover)] hover:rounded-xl"
          onClick={() => {
            setIsClose(false);
            openProfileModal(true);
          }}
        >
          프로필
        </div>
        <div className="w-full py-3 text-center hover:bg-[var(--color-point-hover)]">
          귓속말
        </div>
        <div className="w-full py-3  text-center hover:bg-[var(--color-point-hover)] hover:rounded-xl">
          방장 위임
        </div>
      </div>
    </div>,
    document.body
  );
}
