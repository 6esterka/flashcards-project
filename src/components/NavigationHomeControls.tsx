import type React from "react";
import type { Flashcard } from "../types/flashcard";

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
      <p className="text-sm text-gray-600">
        The card number is {currentIndex + 1} from {cards.length} cards.
      </p>
      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          disabled={currentIndex === cards.length - 1}
        >
          Next →
        </button>

        <button
          onClick={onMarkAsLearned}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          disabled={cards[currentIndex].isLearned}
        >
          ✅ Learned
        </button>
      </div>
    </div>
  );
};

export default NavigationHomeControls;
