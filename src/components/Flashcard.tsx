import React, { useState } from "react";
import type { Flashcard } from "../types/flashcard";

interface FlashcardProps {
  card: Flashcard;
}

const FlashcardComponent: React.FC<FlashcardProps> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => setFlipped((prev) => !prev);
  return (
    <div onClick={handleFlip} className="w-80 h-48 perspective cursor-pointer">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front card */}
        <div
          className="absolute w-full h-full 
        backface-hidden bg-white border border-gray-300 rounded-xl shadow-md flex items-center justify-center 
        p-4 text-lg font-semibold"
        >
          {card.question}
        </div>
        {/* Back card */}
        <div
          className="absolute w-full h-full
        backface-hidden rotate-y-180 bg-blue-100 border border-gray-300 rounded-xl shadow-md flex items-center
        justify-center p-4 text-base text-gray-800"
        >
          {card.answer}
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;
