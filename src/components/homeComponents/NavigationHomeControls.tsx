import type React from "react";
import type { Flashcard } from "../../types/flashcard";
import { Button } from "../ui/customButton/Button";
import { uiText } from "../../constants/uiText";

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
          {uiText.home.navControls.cardCounter(currentIndex,cards.length)}
      </p>
      )}
      <div className="flex gap-4">
        <Button
          onClick={onPrev}
          variant="primary"
          className="px-4 py-2"
          disabled={currentIndex === 0}
        >
          {uiText.home.navControls.previousButton}
        </Button>

        <Button
          onClick={onNext}
          variant="primary"
          className="px-4 py-2"
          disabled={currentIndex === cards.length - 1 || cards.length === 0}
        >
          {uiText.home.navControls.nextButton}
        </Button>
        
        <Button
          onClick={onMarkAsLearned}
          variant="accent"
          className="px-4 py-2"
          disabled={cards[currentIndex]?.isLearned ?? true}
        >
          {uiText.home.navControls.learnedButton}
        </Button>
      </div>
    </div>
  );
};

export default NavigationHomeControls;
