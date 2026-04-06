import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavigationHomeControls from "@/components/homeComponents/NavigationHomeControls";
import type { Flashcard } from "@/types/flashcard";

describe("NavigationHomeControls", () => {
  const cards: Flashcard[] = [
    {
      id: "1",
      question: "What is the capital of France?",
      answer: "Paris",
      isLearned: false,
    },
    {
      id: "2",
      question: "What is the capital of Germany?",
      answer: "Berlin",
      isLearned: true,
    },
    {
      id: "3",
      question: "What is the capital of Italy?",
      answer: "Rome",
      isLearned: false,
    },
  ];
  it("should disable Previous button when currentIndex is 0", () => {
    render(
      <NavigationHomeControls
        cards={cards}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onMarkAsLearned={vi.fn()}
        currentIndex={0}
      />,
    );
    expect(screen.getByRole("button", { name: "← Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next →" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "✅ Learned" })).toBeEnabled();
    expect(screen.getByText("Card 1 of 3")).toBeInTheDocument();
  });

  it("should disable Next button when currentIndex is at the last card", () => {
    render(
      <NavigationHomeControls
        cards={cards}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onMarkAsLearned={vi.fn()}
        currentIndex={cards.length - 1}
      />,
    );
    expect(screen.getByRole("button", { name: "← Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next →" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "✅ Learned" })).toBeEnabled();
    expect(screen.getByText("Card 3 of 3")).toBeInTheDocument();
  });

  it("should disable Learned button when current card is already learned", () => {
    render(
      <NavigationHomeControls
        cards={cards}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onMarkAsLearned={vi.fn()}
        currentIndex={1}
      />,
    );
    expect(screen.getByRole("button", { name: "← Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next →" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "✅ Learned" })).toBeDisabled();
    expect(screen.getByText("Card 2 of 3")).toBeInTheDocument();
  });
});
