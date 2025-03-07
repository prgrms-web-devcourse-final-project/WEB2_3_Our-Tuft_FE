import { useLoginStore } from "../../store/store";

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

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  // 세션 스토리지에서 토큰 가져오기
  let token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  // 요청 헤더 설정
  let headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let res = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
    ...options,
    headers,
  });

  let data: unknown; // JSON 파싱 실패 대비

  // 응답 데이터 처리
  try {
    data = await res.json();
  } catch (error) {
    throw new Error(`Catch API Error: ${res.status}`);
  }

  // 400 에러 처리 추가
  if (res.status === 400) {
    throw new Error("잘못된 요청입니다. 비밀번호를 확인해주세요.");
  }

  // 401 Unauthorized 발생한 경우, refreshToken을 사용하여 accessToken 갱신 시도
  if (res.status === 401) {
    console.log("401 오류 발생, 액세스 토큰 갱신 시도...");
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh="))
      ?.split("=")[1];

    if (refreshToken) {
      console.log("refreshToken: ", refreshToken);

      const reissueRes = await fetch(`${API_BASE_URL}/api/v1/auth/reissue`, {
        method: "POST",
        credentials: "include", // 쿠키를 포함해 보내기 위한 설정
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (reissueRes.ok) {
        // 새로운 accessToken을 sessionStorage에 저장
        const newAccessToken = reissueRes.headers.get("authorization");
        if (newAccessToken) {
          useLoginStore.getState().login(newAccessToken);

          headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
            ...(options.headers || {}),
          };

          // 새로운 accessToken을 사용해 원래 요청 재시도
          res = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
            ...options,
            headers,
          });
          // 재시도 후 결과 반환
          data = await res.json();
        } else {
          throw new Error("새로운 accessToken 발급 실패1");
        }
      } else {
        throw new Error("새로운 accessToken 발급 실패2");
      }
    } else {
      throw new Error("refresh 토큰을 찾을 수 없음.");
    }
  }

  // 응답 상태 체크 (API 응답 실패, ex) HTTP 401 error)
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return data as T;
}
