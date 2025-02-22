import { useModalStore } from "../../store/modalStore";

export default function ModalButton() {
  const { isClose } = useModalStore();

  return (
    <div className="flex gap-4">
      <button
        className="bg-[#4E4C4C] rounded-xl px-5 py-2 cursor-pointer"
        onClick={isClose}
      >
        취소
      </button>
      <button className="bg-[var(--color-point)] rounded-xl px-5 py-2 cursor-pointer">
        확인
      </button>
    </div>
  );
}
