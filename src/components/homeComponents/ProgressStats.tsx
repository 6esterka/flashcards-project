import type { Flashcard } from "@/types/flashcard";
import { uiText } from "@/constants/uiText";

interface ProgressStatsProps {
  cards: Flashcard[];
}

export default function ProgressStats({ cards }: Readonly<ProgressStatsProps>) {
  const learnedCount = cards.filter((card) => card.isLearned).length;
  const totalCount = cards.length;

  return (
    cards.length > 0 && (
      <div className="flex gap-4 mt-4">
        <p className="text-sm text-gray-700">
          {uiText.home.progressStat(learnedCount, totalCount)}
        </p>
      </div>
    )
  );
}
