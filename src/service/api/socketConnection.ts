import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useConnectionStore } from "../../store/store";

let client: Client | null = null;
let activeSubscriptions: Record<string, { id: string }> = {}; // 활성화된 구독 추적
let connectionPromise: Promise<Client> | null = null; // 연결 상태를 추적하기 위한 Promise
let pendingSubscriptions: Array<{
  topic: string;
  callback: (message: any) => void;
}> = []; // 대기 중인 구독

export function useSocketConnection() {
  const { setIsLoading } = useConnectionStore();

  return async (token?: string) => {
    setIsLoading(true);
    try {
      await socketConnection(token);
    } finally {
      setIsLoading(false);
    }
  };
}

/**
 * 웹소켓 연결을 초기화하는 함수
 */
export function socketConnection(token?: string): Promise<Client> {
  if (connectionPromise) {
    return connectionPromise;
  }

  if (client && client.connected) {
    console.log("이미 연결된 STOMP 클라이언트가 있습니다.");
    connectionPromise ??= Promise.resolve(client);
    return connectionPromise;
  }

  const authToken = token ?? sessionStorage.getItem("token") ?? "guest-token";
  const wsUrl = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws`);
  wsUrl.searchParams.append("authorization", authToken);

  connectionPromise = new Promise((resolve, reject) => {
    client = new Client({
      webSocketFactory: () => new SockJS(wsUrl.toString()),
      debug: (msg) => console.log("[STOMP Debug] " + msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log("STOMP 연결 성공!", frame);
        processPendingSubscriptions();
        resolve(client!);
      },
      onStompError: (error) => {
        console.error("STOMP 오류 발생:", error);
        if (connectionPromise) {
          connectionPromise.catch(() => {});
          connectionPromise = null;
        }
        reject(error);
      },
      onWebSocketClose: (event) => {
        console.warn("WebSocket 연결 종료", event);

        const pendingSet = new Set(
          pendingSubscriptions.map((sub) => sub.topic)
        );
        Object.keys(activeSubscriptions).forEach((topic) => {
          if (!pendingSet.has(topic)) {
            pendingSubscriptions.push({
              topic,
              callback: (msg) => console.log(`${topic} 재구독 메시지:`, msg),
            });
          }
        });

        activeSubscriptions = {};
        if (connectionPromise) {
          connectionPromise.catch(() => {});
          connectionPromise = null;
        }
      },
    });

    client.activate();
  });

  return connectionPromise;
}

/**
 * 대기 중인 구독을 처리하는 함수
 */
function processPendingSubscriptions() {
  if (!client || !client.connected) return;

  console.log(`처리할 대기 구독: ${pendingSubscriptions.length}개`);

  while (pendingSubscriptions.length > 0) {
    const { topic, callback } = pendingSubscriptions.shift()!;
    console.log(`대기 중이던 구독 처리: ${topic}`);
    subscribeToTopic(topic, callback);
  }
}

/**
 * 현재 클라이언트 인스턴스 반환
 */
export function getClient(): Client | null {
  return client;
}

/**
 * 웹소켓이 연결되어 있는지 확인
 */
export function isConnected(): boolean {
  return client !== null && client.connected;
}

/**
 * 특정 토픽이 이미 구독 중인지 확인
 */
export function isTopicSubscribed(topic: string): boolean {
  return !!activeSubscriptions[topic];
}

/**
 * 특정 채널을 구독
 */
export function subscribeToTopic(
  topic: string,
  callback: (message: any) => void
) {
  // 클라이언트가 없거나 연결되지 않았으면 대기 목록에 추가
  if (!client || !client.connected) {
    console.log(
      `STOMP 클라이언트가 아직 연결되지 않음. 구독 대기 목록에 추가: ${topic}`
    );
    pendingSubscriptions.push({ topic, callback });

    // 연결이 아직 시도되지 않았다면 연결 시도
    if (!connectionPromise) {
      console.log("STOMP 연결 시작");
      socketConnection();
    }
    return;
  }

  // 이미 해당 토픽을 구독 중인지 확인
  if (activeSubscriptions[topic]) {
    console.warn(`이미 ${topic}을 구독 중입니다.`);
    return activeSubscriptions[topic];
  }

  const subscription = client.subscribe(topic, (message) => {
    try {
      const parsedMessage =
        typeof message.body === "string" && message.body.startsWith("{")
          ? JSON.parse(message.body)
          : message.body;

      // 2차 파싱: message 필드가 JSON 문자열이면 다시 파싱
      if (
        typeof parsedMessage.message === "string" &&
        parsedMessage.message.startsWith('"')
      ) {
        parsedMessage.message = JSON.parse(parsedMessage.message);
      }
      console.log("message.body", message.body);
      callback(parsedMessage);
    } catch (error) {
      console.error("메시지 파싱 오류:", error);
      callback(message.body); // 파싱 실패 시 원본 메시지 전달
    }
  });

  // 활성 구독 목록에 추가
  activeSubscriptions[topic] = subscription;

  console.log(`${topic} 구독 완료`);
  return subscription;
}

/**
 * 특정 채널을 구독해지
 */
export function unsubscribeFromTopic(topic: string) {
  // 클라이언트가 없거나 연결되지 않았으면 구독 대기 목록에서 제거
  if (!client || !client.connected) {
    console.log(`클라이언트가 연결되지 않음, 대기 구독 목록에서 ${topic} 제거`);
    pendingSubscriptions = pendingSubscriptions.filter(
      (sub) => sub.topic !== topic
    );
    return;
  }

  // 구독 정보가 있는지 확인
  if (!activeSubscriptions[topic]) {
    console.log(`${topic}에 대한 구독 정보가 없습니다.`);
    return;
  }

  // 구독 해제
  try {
    if (activeSubscriptions[topic].id) {
      client.unsubscribe(activeSubscriptions[topic].id);
      console.log(`${topic} 구독 해지 완료`);
    }
    // 구독 목록에서 제거
    delete activeSubscriptions[topic];
  } catch (error) {
    console.error(`구독 해제 중 오류 발생: ${error}`);
  }
}

/**
 * STOMP를 통해 메시지를 전송
 */
export function publishMessage(destination: string, message: any) {
  if (!client || !client.connected) {
    console.log("STOMP 클라이언트가 연결되지 않았습니다.");
    return;
  }

  // 메시지를 destination으로 전송
  client.publish({
    destination: destination,
    body: message,
  });

  console.log(`${destination}로 메시지 전송:`, message);
}

/**
 * 로비 입장 시 구독
 */
export function enterLobby(callback: (message: any) => void) {
  // 이미 구독 중인지 확인
  if (activeSubscriptions["/topic/room/lobby"]) {
    console.log("이미 로비에 입장한 상태입니다.");
    return activeSubscriptions["/topic/room/lobby"];
  }

  console.log("로비 입장 및 구독");
  return subscribeToTopic("/topic/room/lobby", callback);
}

/**
 * 게임방 입장 시 로비 구독 해제하고 게임방 구독
 */
export function enterRoom(roomId: string, callback: (message: any) => void) {
  console.log(`${roomId} 방 입장`);

  // 로비 구독 해제
  unsubscribeFromTopic("/topic/room/lobby");

  // 해당 방 구독
  return subscribeToTopic(`/topic/room/${roomId}`, callback);
}

/**
 * 게임방 퇴장 시 게임방 구독 해제하고 로비 구독
 */
export function exitRoom(
  roomId: string,
  lobbyCallback: (message: any) => void
) {
  console.log(`${roomId} 방 퇴장`);

  // 게임방 구독 해제
  unsubscribeFromTopic(`/topic/room/${roomId}`);

  // 로비 재구독
  return enterLobby(lobbyCallback);
}

/**
 * STOMP 연결 해제
 */
export function disconnectSocket() {
  if (client && client.connected) {
    client.deactivate();
    activeSubscriptions = {}; // 구독 정보 초기화
    console.log("STOMP 연결 종료");
  }
}

/**
 * 메시지 전송 (publishMessage와 동일 기능, 호환성 유지)
 */
export function sendMessage(destination: string, message: any) {
  return publishMessage(destination, message);
}
