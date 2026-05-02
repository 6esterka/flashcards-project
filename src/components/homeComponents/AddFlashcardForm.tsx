import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/customButton/Button";
import { uiText } from "@/constants/uiText";
import { useFlashcardStore } from "@/store/useFlashcardStore";

interface AddFlashcardProps {
  onClose: () => void;
}

export default function AddFlashcardForm({
  onClose,
}: Readonly<AddFlashcardProps>) {
  const addCard = useFlashcardStore((state) => state.addCard);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formattedQuestion = question.trim();
    const formattedAnswer = answer.trim();
    if (!formattedQuestion || !formattedAnswer) return;
    addCard(formattedQuestion, formattedAnswer);
    setQuestion("");
    setAnswer("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-bg-surface p-4 rounded shadow-md space-y-4 mt-6"
      >
        <div>
          <label
            htmlFor="question-input"
            className="block text-sm font-medium text-text-secondary"
          >
            {uiText.home.addCardForm.questionInputLabel}
          </label>
          <input
            id="question-input"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-bg-surface text-text-primary border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring"
            placeholder={uiText.home.addCardForm.questionInputPlaceholder}
          />
        </div>
        <div>
          <label
            htmlFor="answer-input"
            className="block text-sm font-medium text-text-secondary"
          >
            {uiText.home.addCardForm.answerInputLabel}
          </label>
          <input
            id="answer-input"
            type="text"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 bg-bg-surface text-text-primary border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring"
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={!question.trim() || !answer.trim()}
        >
          {uiText.home.addCardForm.addCardButton}
        </Button>
      </form>
    </div>
  );
}
