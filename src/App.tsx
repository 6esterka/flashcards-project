import { useState } from "react";
import "./App.css";
import FlashcardComponent from "./components/Flashcard";
import type { FlashCard } from "./types/flashcard";

const initialCards: FlashCard[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    answer: "Paris",
    isLearned: false,
  },
  {
    id: "2",
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
    isLearned: false,
  },
  {
    id: "3",
    question: "What is the chemical symbol for water?",
    answer: "H2O",
    isLearned: false,
  },
  {
    id: "4",
    question: 'Who wrote "To Kill a Mockingbird"?',
    answer: "Harper Lee",
    isLearned: false,
  },
];


function App() {
  const [cards, setCards] = useState<FlashCard[]>(initialCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const goPrevious = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const goNext = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  const markAsLearned = () => {
    const updated = cards.map((card, index) =>
      index === currentCardIndex ? { ...card, isLearned: true } : card
    );
    setCards(updated);
  };

  const currentCard = cards[currentCardIndex];
  //TODO Left on adding a button please after adding push the commit to Github
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <FlashcardComponent card={currentCard} />
      <p className="text-sm text-gray-600 mt-4">
        The card number is {currentCardIndex + 1} from {cards.length} cards.
      </p>
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          onClick={goPrevious}
          disabled={currentCardIndex === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          onClick={goNext}
          disabled={currentCardIndex === cards.length - 1}
        >
          Next
        </button>
        <button
          onClick={markAsLearned}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          disabled={cards[currentCardIndex].isLearned}
        >
          Learned ✅
        </button>
      </div>
    </div>
  );
}

export default App;
