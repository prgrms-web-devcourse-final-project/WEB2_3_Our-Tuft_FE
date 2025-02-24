import ChatBubble from "./chatBubble";

export default function ChatBubbleList() {
  return (
    <div className="flex justify-between">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
        <ChatBubble key={index} />
      ))}
    </div>
  );
}
