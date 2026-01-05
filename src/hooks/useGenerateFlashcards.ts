import { useState, type FormEvent } from "react";
import GeneratorAI from "@/api/GeneratorAI";
import type { RequestStatus } from "@/types/requestStatus";
import type { Flashcard } from "@/types/flashcard";

export function useGenerateFlashcards() {
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");
  const [errorText, setErrorText] = useState("");
  const [generatedCards,setGeneratedCards]=useState<Flashcard[]>();

  const onGenerateHandler = async (): Promise<Flashcard[]> =>
    await GeneratorAI.generateFlashcards(topic);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!topic.trim()) return;
    setIsGenerating(true);
    setProgress(0);
    setRequestStatus("idle");

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 90));
    }, 250);
    try {
      setGeneratedCards(await onGenerateHandler());
      setRequestStatus("success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setErrorText(message);
      setRequestStatus("error");
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
        setRequestStatus("idle");
      }, 1200);
    }
    setTopic("");
  };

  return {
    progress,
    isGenerating,
    requestStatus,
    errorText,
    handleSubmit,
    topic,
    setTopic,
    generatedCards
  };
}
