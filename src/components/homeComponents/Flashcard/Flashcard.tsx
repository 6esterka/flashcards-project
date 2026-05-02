import { useState } from "react";
import type { Flashcard } from "@/types/flashcard";
import FrontCard from "@/components/homeComponents/Flashcard/FrontCard";

interface FlashcardProps {
  card: Flashcard;
  onDelete: (id: string) => void;
  isBeingDeleted: string | null;
  onEdit: () => void;
}

export default function FlashcardComponent({
  card,
  onDelete,
  isBeingDeleted,
  onEdit,
}: Readonly<FlashcardProps>) {
  const [flipped, setFlipped] = useState(false);
  if (!card) return null;

  const handleFlip = () => setFlipped((prev) => !prev);

  // Determine card styles
  const baseClasses =
    "absolute w-full h-full backface-hidden flex items-center justify-center p-4 rounded-xl transition-all duration-500";
  const frontClasses =
    "bg-bg-surface border-2 border-primary shadow-md cursor-pointer";
  const backClasses =
    "bg-card-back border-2 border-card-back shadow-md flex items-center justify-center text-text-primary";

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
}
