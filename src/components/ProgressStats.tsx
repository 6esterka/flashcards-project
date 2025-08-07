import type { Flashcard } from "../types/flashcard";
import React from "react";

interface Props {
    cards: Flashcard[];
}

const ProgressStats: React.FC<Props> = ({ cards }) => {
    const learnedCount = cards.filter((card) => card.isLearned).length;
    const totalCount = cards.length;

    return cards.length>0&&(
        <div className="flex gap-4 mt-4">
            <p className="text-sm text-gray-700">
                Progress: {learnedCount} out of {totalCount} cards learned.
            </p>
        </div>
    );
}

export default ProgressStats;
