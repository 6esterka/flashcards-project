import React, { useState} from "react";
import type { Flashcard } from "../types/flashcard";
import RemoveCardButton from "./RemoveCardButton";
import FrontCard from "./FrontCard";

interface FlashcardProps {
  card: Flashcard;
  onDelete: (id: string) => void;
  isBeingDeleted:string|null;
  onEdit:()=> void;
}

const FlashcardComponent: React.FC<FlashcardProps> = ({ card, onDelete,isBeingDeleted,onEdit}) => {
  const [flipped, setFlipped] = useState(false);
  if (!card) return null;

  const handleFlip = () => setFlipped((prev) => !prev);

  
  return (
    <div
      onClick={handleFlip}
      className={`w-80 h-48 perspective cursor-pointer transition-all duration-300 ease-in-out ${
        isBeingDeleted===card.id ? "opacity-0 scale-95" : ""
      }`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front card */}
        <FrontCard card={card} onDelete={onDelete} onEdit={onEdit}/>
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
