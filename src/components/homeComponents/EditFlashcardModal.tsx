import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/customButton/Button";
import { uiText } from "@/constants/uiText";
import { useFlashcardStore } from "@/store/useFlashcardStore";

interface EditFlashcardModalProps {
  onClose: () => void;
  editingCardId: string;
  setEditingCardId: (editCardId: string | null) => void;
}

export default function EditFlashcardModal({
  onClose,
  editingCardId,
  setEditingCardId,
}: Readonly<EditFlashcardModalProps>) {
  const updateCard = useFlashcardStore((state) => state.updateCard);
  const selectedGroupName = useFlashcardStore(
    (state) => state.selectedGroupName,
  );
  const editFlashcard = useFlashcardStore((state) =>
    selectedGroupName
      ? state.decks[selectedGroupName]?.find(
          (card) => card.id === editingCardId,
        )
      : undefined,
  );
  const [question, setQuestion] = useState(editFlashcard?.question ?? "");
  const [answer, setAnswer] = useState(editFlashcard?.answer ?? "");

  const onSaveButtonClickHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!editFlashcard) {
      console.log("Missing edit flashcard");
      return;
    }

    if (!question.trim() || !answer.trim()) {
      alert("Please fill in both question and answer fields.");
      return;
    }
    updateCard(editFlashcard.id, {
      question: question.trim(),
      answer: answer.trim(),
    });
    setEditingCardId(null);
    onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSaveButtonClickHandler}
        className="bg-bg-surface rounded-lg p-6 max-w-md w-full shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          {uiText.home.editCardForm.formTitle}
        </h2>
        <label className="block mb-2 font-medium">
          {uiText.home.editCardForm.questionInputLabel}
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-bg-surface text-text-primary border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <label className="block mb-2 font-medium">
          {uiText.home.editCardForm.answerInputLabel}
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full bg-bg-surface text-text-primary border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex justify-center space-x-3">
          <Button variant="primary" type="submit">
            {uiText.home.editCardForm.saveButton}
          </Button>
          <Button onClick={onClose} variant="secondary">
            {uiText.home.editCardForm.cancelButton}
          </Button>
        </div>
      </form>
    </div>
  );
}
