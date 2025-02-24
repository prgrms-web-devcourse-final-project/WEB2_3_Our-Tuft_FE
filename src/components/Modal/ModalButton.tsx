export default function ModalButton({
  setIsClose,
  setIsComplete,
}: {
  setIsClose: (val: boolean) => void;
  setIsComplete?: <T>(val?: T) => void;
}) {
  return (
    <div className="absolute bottom-0 right-0 flex p-8  gap-4 z-30">
      <button
        className="bg-[#4E4C4C] rounded-xl px-5 py-2 cursor-pointer"
        onClick={() => setIsClose(false)}
      >
        취소
      </button>
      <button
        className="bg-[var(--color-point)] rounded-xl px-5 py-2 cursor-pointer"
        onClick={() => setIsComplete?.()}
      >
        확인
      </button>
    </div>
  );
}
