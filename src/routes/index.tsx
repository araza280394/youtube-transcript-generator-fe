import { createFileRoute } from "@tanstack/react-router";
import TranscriptApp from "../components/TranscriptApp";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <TranscriptApp />;
}
