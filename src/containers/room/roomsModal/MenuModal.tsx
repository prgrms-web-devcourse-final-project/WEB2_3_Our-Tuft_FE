import Modal from "../../../components/Modal/Modal";
import { useModalStore } from "../../../store/modalStore";

export default function MenuModal() {
  const { position, isOpen, isClose } = useModalStore();
  return (
    <div
      className="flex flex-col items-center fixed bg-[var(--color-point)] rounded-xl text-[16px] cursor-pointer opacity-90"
      style={{ top: position?.y, left: position?.x }}
    >
      <div
        className="w-full h-full px-18 py-3  text-center hover:bg-[var(--color-point-hover)] hover:rounded-xl"
        onClick={() => {
          isClose;
          isOpen("profile");
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
  );
}
