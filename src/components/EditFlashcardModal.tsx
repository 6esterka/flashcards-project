import React, { useState,type FormEvent } from "react";
import type { Flashcard } from "../types/flashcard";
import { Button } from "./ui/customButton/Button";

interface EditFlashcardModalProps {
  onClose: () => void;
  editFlashcard: Flashcard;
  onSave: (id:string,updatedFields:Partial<Flashcard>) => void;
}

const EditFlashcardModal: React.FC<EditFlashcardModalProps> = ({
  onClose,
  editFlashcard,
  onSave,
}) => {
  const [question, setQuestion] = useState(editFlashcard?.question);
  const [answer, setAnswer] = useState(editFlashcard?.answer);
  const onSaveButtonClickHandler = (event:FormEvent) => {
    event.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert("Please fill in both question and answer fields.");
      return;
    }
    onSave(editFlashcard.id,{question, answer});
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
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Flashcard</h2>
        <label className="block mb-2 font-medium">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block mb-2 font-medium">Answer:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-center space-x-3">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditFlashcardModal;
