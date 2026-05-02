import { uiText } from "@/constants/uiText";
import { useFlashcardStore } from "@/store/useFlashcardStore";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DeckStats } from "@/types/deckStats";

export default function Stats() {
  const decks = useFlashcardStore((state) => state.decks);
  const chartData: DeckStats[] = useMemo(() => {
    return Object.entries(decks).map(([name, cards]) => {
      const learnedCount = cards.filter((card) => card.isLearned).length;
      const totalCount = cards.length;

      return {
        name,
        learned: learnedCount,
        unlearned: totalCount - learnedCount,
      };
    });
  }, [decks]);
  const totalMastery = useMemo(() => {
    const allCards = Object.values(decks).flat();
    const total = allCards.length;
    const allLearnedCardsCount = allCards.filter(
      (card) => card.isLearned,
    ).length;
    const percent =
      total > 0 ? Math.round((allLearnedCardsCount / total) * 100) : 0;
    return percent;
  }, [decks]);
  return (
    <div className="min-h-screen bg-bg-page p-6 space-y-8">
      {/* 1. Total Mastery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-bg-surface p-6 rounded-[2rem] shadow-sm border border-border">
          <p className="text-text-muted text-sm font-medium">
            {uiText.stats.totalMasteryTitle}
          </p>
          <h3 className="text-3xl font-bold text-primary">
            {uiText.stats.totalMasteryPercentage(totalMastery)}
          </h3>
        </div>
      </div>

      {/* 2. Main Progress Chart */}
      <div className="bg-bg-surface p-8 rounded-[2rem] shadow-sm border border-border h-[400px]">
        <h2 className="text-xl font-bold mb-6 text-text-primary">
          {uiText.stats.learningProgressStatTitle}
        </h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "var(--color-border)" }}
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                backgroundColor: "var(--color-bg-surface)",
                color: "var(--color-text-primary)",
              }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" />
            {/* Learned */}
            <Bar
              dataKey="learned"
              stackId="a"
              fill="#556cd6"
              radius={[0, 0, 4, 4]}
            />
            {/* Unlearned */}
            <Bar
              dataKey="unlearned"
              stackId="a"
              fill="#e76f51"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
