import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client: Client | null = null;

export function socketConnection(token?: string) {
  if (client && client.connected) {
    console.warn("이미 연결된 STOMP 클라이언트가 있습니다.");
    return;
  }
  const tokena = "임시토큰";
  client = new Client({
    webSocketFactory: () =>
      new SockJS(`https://hiq-lounge.duckdns.org/ws?authorization=${tokena}`),
    debug: (msg) => console.log("[STOMP Debug] " + msg),
    reconnectDelay: 5000, // 자동 재연결 (5초)
    heartbeatIncoming: 4000, // 서버에서 4초마다 핑을 받음
    heartbeatOutgoing: 4000, // 클라이언트가 4초마다 핑을 보냄
    onConnect: (frame) => {
      console.log("STOMP 연결 성공!", frame);
    },
    onStompError: (error) => {
      console.error("STOMP 오류 발생:", error);
    },
    onWebSocketClose: (event) => {
      console.warn("WebSocket 연결 종료", event);
    },
  });

  client.activate();
}

/**
 * 특정 채널을 구독
 */
export function subscribeToTopic(
  topic: string,
  callback: (message: any) => void
) {
  if (!client || !client.connected) {
    console.error("STOMP 클라이언트가 아직 연결되지 않았습니다.");
    return;
  }

  client.subscribe(topic, (message) => {
    const chatMessage = JSON.parse(message.body);
    callback(chatMessage);
  });

  console.log(`${topic} 구독 완료`);
}

/**
 * 특정 채널을 구독해지
 */
export function unsubscribeToTopic(topic: string) {
  if (!client || !client.connected) {
    console.error("STOMP 클라이언트가 아직 연결되지 않았습니다.");
    return;
  }

  client.unsubscribe(topic);

  console.log(`${topic} 구독 해지 완료`);
}

/**
 * STOMP를 통해 메시지를 전송
 */
export function sendMessage(destination: string, message: any) {
  if (!client || !client.connected) {
    console.error("STOMP 클라이언트가 연결되지 않았습니다.");
    return;
  }

  // 메시지를 destination으로 전송
  if (client.connected)
    client.publish({
      destination: destination,
      body: JSON.stringify(message),
    });

  console.log(`${destination}로 메시지 전송:`, message);
}

/**
 *  STOMP 연결 해제
 */
export function disconnectSocket() {
  if (client && client.connected) {
    client.deactivate();
    console.log("STOMP 연결 종료");
  }
}
