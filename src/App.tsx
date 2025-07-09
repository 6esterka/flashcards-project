import { useState } from "react";
import "./App.css";
import FlashcardComponent from "./components/Flashcard";
import type { Flashcard } from "./types/flashcard";
import ProgressStats from "./components/ProgressStats";
import NavigationControls from "./components/NavigationControls";

const initialCards: Flashcard[] = [
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
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
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
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <FlashcardComponent card={currentCard} />
      <NavigationControls
        currentIndex={currentCardIndex}
        cards={cards}
        onPrev={goPrevious}
        onNext={goNext}
        onMarkAsLearned={markAsLearned}
      />
      <ProgressStats cards={cards} />
    </div>
  );
}

export default App;
