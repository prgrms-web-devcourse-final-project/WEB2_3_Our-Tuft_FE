type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE"; // HTTP 메서드
  headers?: Record<string, string>; // 요청 헤더
  body?: string; // 요청 본문 (주로 POST, PUT에서 사용)
};

export async function defaultFetch<T>(
  endpoint: string, // (ex: "/users", "posts/1" etc..)
  options: FetchOptions = {}
): Promise<T> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // 세션 스토리지에서 토큰 가져오기
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  // 요청 헤더 설정
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
    ...options,
    headers,
  });

  let data: unknown;

  try {
    data = await res.json();
  } catch (error: unknown) {
    // error가 unknown 타입이라 안전하게 처리해야 함
    if (error instanceof Error) {
      throw new Error(`Catch API Error: ${res.status} - ${error.message}`);
    } else {
      throw new Error(`Catch API Error: ${res.status} - Unknown error`);
    }
  }

  // 400 에러 처리 추가
  if (res.status === 400) {
    throw new Error("잘못된 요청입니다. 비밀번호를 확인해주세요.");
  }

  // 응답 상태 체크 (API 응답 실패, ex) HTTP 401 error)
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return data as T;
}
