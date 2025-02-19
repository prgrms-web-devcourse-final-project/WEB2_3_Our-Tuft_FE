import UserCard from "./UserCard";

export default function UserList() {
  return (
    <div className="grid grid-cols-4 gap-10 rounded-[30px] bg-[var(--color-second)] p-9">
      <UserCard color="point" />
      <UserCard color="secondPoint" />
      <UserCard />
      {[1, 2, 3, 4, 5].map((i, index) => (
        <UserCard key={index} />
      ))}
    </div>
  );
}
