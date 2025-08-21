import React, { type FormEvent, useState } from "react";

interface AddFlashcardProps {
  onAddFlashcard: (question: string, answer: string) => void;
  onClose: () => void;
}

const AddFlashcardForm: React.FC<AddFlashcardProps> = ({
  onAddFlashcard,
  onClose,
}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formattedQuestion = question.trim();
    const formattedAnswer = answer.trim();
    if (!formattedQuestion || !formattedAnswer) return;
    onAddFlashcard(formattedQuestion, formattedAnswer);
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
        className="w-full max-w-md bg-white p-4 rounded shadow-md space-y-4 mt-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="For ex: Who is Jimmy Neutron?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <input
            type="text"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          ➕ Add card
        </button>
      </form>
    </div>
  );
};

export default AddFlashcardForm;
