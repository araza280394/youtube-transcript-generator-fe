interface TranscriptResultProps {
  transcript: string;
  loading: boolean;
  error: string;
}

export default function TranscriptResult({
  transcript,
  loading,
  error,
}: TranscriptResultProps) {
  if (loading) {
    return (
      <div className="result-box result-loading">
        <div className="spinner" aria-hidden="true" />
        <span>Generating transcript...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-box result-error" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!transcript) {
    return (
      <div className="result-box result-empty">
        Your transcript will appear here.
      </div>
    );
  }

  return (
    <div className="result-wrapper">
      <h2 className="result-title">Transcript</h2>
      <textarea
        className="result-textarea"
        value={transcript}
        readOnly
        rows={16}
      />
    </div>
  );
}
