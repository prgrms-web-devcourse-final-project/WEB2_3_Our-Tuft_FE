import UserCard from "./UserCard";

export default function UserList() {
  return (
    <div className="grid grid-cols-4 lg:gap-8 md:gap-3 lg:rounded-[32px] md:rounded-[20px] bg-[var(--color-second)] p-7">
      <UserCard color="point" />
      <UserCard color="secondPoint" />
      <UserCard />
      {[1, 2, 3, 4, 5].map((i, index) => (
        <UserCard key={index} />
      ))}
    </div>
  );
}
