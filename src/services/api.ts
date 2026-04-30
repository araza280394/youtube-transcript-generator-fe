import axios from "axios";

// Configure your Spring Boot backend base URL here.
// You can also set VITE_API_BASE_URL in a .env file to override.
const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  // "http://localhost:8080";
  "https://youtube-transcript-app-udrh.onrender.com/api/transcript";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export interface TranscriptResponse {
  transcript?: string;
  text?: string;
  message?: string;
}

/**
 * Request a transcript from the backend.
 */
export async function fetchTranscript(
  youtubeUrl: string,
): Promise<TranscriptResponse | string> {
  const response = await apiClient.post<TranscriptResponse | string>(
    "/api/transcript",
    { youtubeUrl },
  );
  return response.data;
}
