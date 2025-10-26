import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/customButton/Button";
import ProgressBar from "../components/generateComponents/ProgressBar";

interface GenerateProps {
  readonly onGenerate: (topic: string) => Promise<void>;
}

export default function Generate({ onGenerate }: GenerateProps) {
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!topic.trim()) return;
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 90));
    }, 250);
    try {
      await onGenerate(topic);
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 600);
    }
    setTopic("");
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Generate Flashcards
      </h1>
      <ProgressBar progress={progress} isVisible={isGenerating} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!topic.trim() || isGenerating}
        >
          Generate
        </Button>
      </form>
    </div>
  );
}
