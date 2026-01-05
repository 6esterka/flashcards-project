import { Button } from "@/components/ui/customButton/Button";
import ProgressBar from "@/components/generateComponents/ProgressBar";
import { uiText } from "@/constants/uiText";
import GenerationStatus from "@/components/generateComponents/GenerationStatus";
import { useGenerateFlashcards } from "@/hooks/useGenerateFlashcards";
import GeneratedCardLog from "@/components/generateComponents/GeneratedCardLog";

export default function Generate() {
  const {
    progress,
    isGenerating,
    requestStatus,
    errorText,
    handleSubmit,
    topic,
    setTopic,
    generatedCards
  }=useGenerateFlashcards();
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
        <GeneratedCardLog generatedCards={generatedCards}/>
      </form>
    </div>
  );
}
