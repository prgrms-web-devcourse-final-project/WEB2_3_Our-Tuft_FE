"use client";

interface ItemCardProps {
  imageUrl: string;
  name: string;
}

export default function ItemCard({ imageUrl, name }: ItemCardProps) {
  return (
    <div className="grid grid-rows-3 grid-cols-2 bg-[var(--color-second)] w-full h-18 h-36 md:h-24 lg:h-28 xl:h-36 2xl:h-56 px-5 py-3 max-[480px]:px-3 md:px-3.5 md:py-2 xl:px-5 xl:py-3 max-[480px]:gap-x-2.5 gap-x-5 gap-y-2.5 md:gap-x-2.5 md:gap-y-1.5 lg:gap-x-5 lg:gap-y-2.5 rounded-2xl">
      <div className="row-span-3 bg-[var(--color-main)] rounded-2xl flex items-center justify-center">
        <span className="text-center">{imageUrl}</span>
      </div>
      <div className="row-span-1 bg-[var(--color-point)] rounded-2xl flex items-center justify-center">
        <span className="text-white text-center md:text-base lg:text-lg xl:text-xl 2xl:text-3xl">
          {name}
        </span>
      </div>
      <div className="relative row-span-2 bg-[var(--color-main)] rounded-2xl">
        <div className="absolute right-1 bottom-1 2xl:right-2 2xl:bottom-2 bg-[var(--color-point)] px-2 py-1 md:px-1.5 md:py-0.5 lg:px-2 lg:py-1 2xl:px-3 2xl:py-2 rounded-xl md:rounded-lg lg:rounded-xl">
          <button
            className="text-white text-center text-base md:text-sm lg:text-base 2xl:text-lg cursor-pointer"
            onClick={() => console.log(`${name} 구매`)}
          >
            구매
          </button>
        </div>
      </div>
    </div>
  );
}
