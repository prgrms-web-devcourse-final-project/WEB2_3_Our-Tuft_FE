"use server";

import { topicModal } from "../../types/modalType";

export const fetchTopicData = async (): Promise<topicModal> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${API_BASE_URL}/api/v1/quizzes/OX`, {
    method: "GET",
    cache: "no-store", // HTTP 캐싱 방지
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  let data: unknown;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Catch API Error: ${response.status}`);
  }

  return data as topicModal;
};
