import ChatBubbleList from "./chatBubbleList";
import UserList from "./userList";

export default function QuizeMain() {
  return (
    <div className="flex flex-col gap-5 w-full justify-between">
      <ChatBubbleList />
      <UserList />
    </div>
  );
}
