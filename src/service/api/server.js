const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Express 서버 설정
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // 클라이언트 주소
    methods: ["GET", "POST"],
  },
});

let messages = [
  { user: "user1" },
  { user: "user2" },
  { user: "user3" },
  { user: "user4" },
];

let quize = [
  {
    question:
      "보험금을 노리고 퇴원하지 않는 ( ) 때문에 골치를 앓고 있다. 에서 ( ) 에 해당하는 단어는 나이팅게일 신드롬이다.",
    hint: "입원한 상태에서 일부러 퇴원하지 않는 사람",
    answer: true, // 정답: O
  },
  {
    question:
      "어떤 어려운 상황이라도 투지만 있으면 극복할 수 있다. 이 말은 맞다.",
    hint: "어떤 일을 해내려는 굳센 의지",
    answer: true, // 정답: O
  },
  {
    question: "지나치게 의존적인 관계를 공생 관계라고 한다. 이 말은 틀리다.",
    hint: "서로에게 너무 의존하는 관계",
    answer: false, // 정답: X
  },
  {
    question: "환경을 보호하기 위해 에코 제품을 사용해야 한다. 이 말은 맞다.",
    hint: "자연을 해치지 않고 친환경적인 제품",
    answer: true, // 정답: O
  },
  {
    question:
      "자신의 이익만을 생각하는 행동을 이기적 태도라고 한다. 이 말은 맞다.",
    hint: "자신의 이익만을 우선시하는 태도",
    answer: true, // 정답: O
  },
];

// 클라이언트 연결 처리
io.on("connection", (socket) => {
  console.log("A user connected");

  // 클라이언트에게 현재 메시지 배열 전송
  io.emit("update_messages", messages);
  io.emit("quize", quize);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    io.to(room).emit("userJoined", `${socket.id}`);
  });

  socket.on("chat_message", (msg) => {
    console.log("Received message:", msg);
    io.emit("chat_message", { ...msg }); // 메시지 방송
  });

  socket.on("answer", (msg) => {
    console.log("answer:", msg);
    io.emit("answer", { ...msg }); // 메시지 방송
  });

  // 연결 해제 처리
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// 서버 실행
server.listen(8080, () => {
  console.log("Socket.IO server running on http://localhost:8080");
});
