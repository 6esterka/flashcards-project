import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/customButton/Button";
import ProgressBar from "@/components/generateComponents/ProgressBar";
import { uiText } from "@/constants/uiText";
import GenerationStatus from "@/components/generateComponents/GenerationStatus";
import type { PromptFlashcard } from "@/types/promptFlashcard";
import GeneratorAI from "@/api/GeneratorAI";
import type { RequestStatus } from "@/types/requestStatus";

export default function Generate() {
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [requestStatus,setRequestStatus]=useState<RequestStatus>('idle');
  const [errorText,setErrorText]=useState("");
  // const [generatedCards,setGeneratedCards]=useState<Flashcard[]>([]);

  const onGenerateHandler=async ():Promise<PromptFlashcard[]> => await GeneratorAI.generateFlashcards(topic)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!topic.trim()) return;
    setIsGenerating(true);
    setProgress(0);
    setRequestStatus('idle');

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 90));
    }, 250);
    try {
      await onGenerateHandler();
      setRequestStatus('success');
    }catch(error){
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      setErrorText(message);
      setRequestStatus('error');
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
        setRequestStatus('idle');
      }, 1200);
    }
    setTopic("");
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {uiText.generate.pageTitle}
      </h1>
      <ProgressBar progress={progress} isVisible={isGenerating} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={uiText.generate.inputPlaceHolder}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!topic.trim() || isGenerating}
        >
          {uiText.generate.generateButton}
        </Button>
        <GenerationStatus requestStatus={requestStatus} errorText={errorText}/>
      </form>
    </div>
  );
}
