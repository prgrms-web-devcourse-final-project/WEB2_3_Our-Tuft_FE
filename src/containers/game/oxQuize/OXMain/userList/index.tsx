import UserCard from "../../../../../components/UserCard";

export default function UserList() {
  return (
    <div className="flex justify-between">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i, index) => (
        <UserCard
          key={index}
          bgColor={"bg-[#ffd377]"}
          imageSize={"h-40"}
          textSize2={"text-[18px]"}
        >
          <div className="justify-cente pt-2 text-2xl font-bold">250</div>
        </UserCard>
      ))}
    </div>
  );
}
