export const LABELS = {
  deckLibrary: {
    title: "Welcome to flashcards quiz",
  },
  studyPage: {
    filterAll: "all",
    filterNew: "new",
    filterLearned: "learned",
    prevButton: "← Previous",
    nextButton: "Next →",
    learnedButton: "✅ Learned",
    noCardIndicator: "No flashcards yet for this group",
    loadingIndicator: "Loading flashcards...",
    cardCounter: (index: number, total: number) =>
      `Card ${index + 1} of ${total}`,
    cardCounterPattern: /Card \d+ of \d+/,
    cardCounterCapture: /Card \d+ of (\d+)/,
    progressStat: (learned: number, total: number) =>
      `Progress: ${learned} out of ${total} cards learned.`,
    homeNavButton: "Home",
  },
  statsPage: {
    totalMasteryTitle: "Total Mastery",
    statsNavButton: "Stats",
    totalMasteryPercentage: (percentage: number) => `${percentage}%`,
  },
};
