import React, { useState } from "react";
import type { Flashcard } from "@/types/flashcard";
import FrontCard from "@/components/homeComponents/Flashcard/FrontCard";

interface FlashcardProps {
  card: Flashcard;
  onDelete: (id: string) => void;
  isBeingDeleted: string | null;
  onEdit: () => void;
}

const FlashcardComponent: React.FC<FlashcardProps> = ({
  card,
  onDelete,
  isBeingDeleted,
  onEdit,
}) => {
  const [flipped, setFlipped] = useState(false);
  if (!card) return null;

  const handleFlip = () => setFlipped((prev) => !prev);

  // Determine card styles
  const baseClasses =
    "absolute w-full h-full backface-hidden flex items-center justify-center p-4 rounded-xl transition-all duration-500";
  const frontClasses =
    "bg-white border-2 border-[#556cd6] shadow-md cursor-pointer";
  const backClasses =
    "bg-[#3b4cc0] border-2 border-[#2f3a9a] shadow-md flex items-center justify-center text-gray-100";

  return (
    <div
      onClick={handleFlip}
      className={`w-80 h-48 perspective transition-all duration-300 ease-in-out ${
        isBeingDeleted === card.id ? "opacity-0 scale-95" : ""
      }`}
    >
      <div
        className={`relative w-full h-full transform-style preserve-3d transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front card */}
        <div className={`${baseClasses} ${frontClasses}`}>
          <FrontCard card={card} onDelete={onDelete} onEdit={onEdit} />
        </div>

        {/* Back card */}
        <div className={`${baseClasses} ${backClasses} rotate-y-180`}>
          {card.answer}
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;
