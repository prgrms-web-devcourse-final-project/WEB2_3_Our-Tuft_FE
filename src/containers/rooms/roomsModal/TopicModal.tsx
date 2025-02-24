import Modal from "../../../components/Modal/index";

export default function TopicModal({
  setIsClose,
}: {
  setIsClose: (val: boolean) => void;
}) {
  return (
    <Modal
      title={"주제 설정"}
      width={"w-[504px]"}
      height={"h-[604px]"}
      setIsClose={setIsClose}
    >
      <div className="flex flex-col text-2xl items-center bg-[var(--color-point)] w-[404px] h-[440px] rounded-xl overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 165].map(
          (i, index) => (
            <div
              className="text-center py-4 w-full h-full hover:bg-[var(--color-second-hover)] cursor-pointer"
              key={index}
            >
              단어
            </div>
          )
        )}
      </div>
    </Modal>
  );
}
