import type { Flashcard } from "../../types/flashcard";
import React from "react";
import { uiText } from "../../constants/uiText";

interface Props {
    cards: Flashcard[];
}

const ProgressStats: React.FC<Props> = ({ cards }) => {
    const learnedCount = cards.filter((card) => card.isLearned).length;
    const totalCount = cards.length;

    return cards.length>0&&(
        <div className="flex gap-4 mt-4">
            <p className="text-sm text-gray-700">
                {uiText.home.progressStat(learnedCount,totalCount)}
            </p>
        </div>
    );
}

export default ProgressStats;
