import { useState, type FormEvent } from "react";

interface TranscriptFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function TranscriptForm({
  onSubmit,
  loading,
}: TranscriptFormProps) {
  const [youtubeUrl, setUrl] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = youtubeUrl.trim();

    if (!trimmed) {
      setValidationError("Please enter a YouTube URL.");
      return;
    }

    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(trimmed)) {
      setValidationError("Please enter a valid YouTube URL.");
      return;
    }

    setValidationError("");
    onSubmit(trimmed);
  };

  return (
    <form className="transcript-form" onSubmit={handleSubmit}>
      <label htmlFor="youtube-url" className="form-label">
        YouTube URL
      </label>
      <div className="form-row">
        <input
          id="youtube-url"
          type="text"
          className="form-input"
          placeholder="https://www.youtube.com/watch?v=..."
          value={youtubeUrl}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {validationError && <p className="form-error">{validationError}</p>}
    </form>
  );
}
