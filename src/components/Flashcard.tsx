import React, { useState } from "react";
import type { Flashcard } from "../types/flashcard";

interface FlashcardProps {
  card: Flashcard;
}

const FlashcardComponent: React.FC<FlashcardProps> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="w-80 bg-white rounded-xl shadow-md cursor-pointer flex items-center justify-center text-center p-4 text-lg font-medium transition-transform duration-300"
      onClick={() => setFlipped(!flipped)}
    >
      {card.isLearned ? '✅ ' : ''}
      {flipped ? card.answer : card.question}
    </div>
  );
};

export default FlashcardComponent;
