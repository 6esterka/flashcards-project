import type React from "react";
import type { Flashcard } from "../types/flashcard";
import { Button } from "./ui/Button";

interface Props {
  currentIndex: number;
  cards: Flashcard[];
  onPrev: () => void;
  onNext: () => void;
  onMarkAsLearned: () => void;
}

const NavigationHomeControls: React.FC<Props> = ({
  currentIndex,
  cards,
  onPrev,
  onNext,
  onMarkAsLearned,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-6 mb-2">
      {cards.length>0&&(
        <p className="text-sm text-gray-600">
        The card number is {currentIndex + 1} from {cards.length} cards.
      </p>
      )}
      <div className="flex gap-4">
        <Button
          onClick={onPrev}
          variant="primary"
          className="px-4 py-2"
          disabled={currentIndex === 0}
        >
          ← Previous
        </Button>

        <Button
          onClick={onNext}
          variant="primary"
          className="px-4 py-2"
          disabled={currentIndex === cards.length - 1 || cards.length === 0}
        >
          Next →
        </Button>
        
        <Button
          onClick={onMarkAsLearned}
          variant="accent"
          className="px-4 py-2"
          disabled={cards[currentIndex]?.isLearned ?? true}
        >
          ✅ Learned
        </Button>
      </div>
    </div>
  );
};

export default NavigationHomeControls;
