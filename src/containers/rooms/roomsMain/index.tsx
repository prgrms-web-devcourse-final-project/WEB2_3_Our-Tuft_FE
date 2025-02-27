import UserList from "./user/UserList";
import Chat from "./chat/Chat";

export default function RoomsMain() {
  return (
    <div className="relative flex xl:gap-9 md:gap-5 pt-3  xl:pb-3 md:pb-3 w-full drop-shadow-custom">
      <div className="flex-3">
        <UserList />
      </div>
      <div
        className="
          bottom-0 w-full
          flex-1 xl:static md:static fixed 
          xl:block md:block hidden"
      >
        <Chat />
      </div>
    </div>
  );
}
