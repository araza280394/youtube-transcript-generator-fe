import { useState } from "react";
import axios from "axios";
import TranscriptForm from "./TranscriptForm";
import TranscriptResult from "./TranscriptResult";
import { fetchTranscript } from "../services/api";

export default function TranscriptApp() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (youtubeUrl: string) => {
    setLoading(true);
    setError("");
    setTranscript("");

    try {
      const data = await fetchTranscript(youtubeUrl);

      const text =
        typeof data === "string"
          ? data
          : data.transcript || data.text || data.message || "";

      if (!text) {
        setError("No transcript returned from the server.");
      } else {
        setTranscript(text);
      }
    } catch (err: unknown) {
      let message = "Failed to fetch transcript.";
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as
          | { message?: string; error?: string }
          | undefined;
        message = data?.message || data?.error || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">YouTube Transcript Generator</h1>
          <p className="app-subtitle">
            Paste a YouTube link and get the full transcript in seconds.
          </p>
        </header>

        <TranscriptForm onSubmit={handleGenerate} loading={loading} />

        <TranscriptResult
          transcript={transcript}
          loading={loading}
          error={error}
        />
      </div>
    </main>
  );
}
