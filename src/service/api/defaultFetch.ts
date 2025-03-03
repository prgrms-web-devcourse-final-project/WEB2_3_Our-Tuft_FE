type fetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
};

export async function defaultFetch<T>(
  endpoint: string,
  options: fetchOptions = {}
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        // 여기에 토큰 넣기
        // Authorization: `Bearer `,
        ...(options.headers || {}),
      },
    }
  );

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
