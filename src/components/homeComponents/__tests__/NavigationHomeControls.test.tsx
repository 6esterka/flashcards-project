import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavigationHomeControls from "@/components/homeComponents/NavigationHomeControls";
import type { Flashcard } from "@/types/flashcard";
import { uiText } from "@/constants/uiText";

const { previousButton, nextButton, learnedButton, cardCounter } =
  uiText.home.navControls;

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
    // Given
    render(
      <NavigationHomeControls
        cards={cards}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onMarkAsLearned={vi.fn()}
        currentIndex={0}
      />,
    );

    // Then
    expect(screen.getByRole("button", { name: previousButton })).toBeDisabled();
    expect(screen.getByRole("button", { name: nextButton })).toBeEnabled();
    expect(screen.getByRole("button", { name: learnedButton })).toBeEnabled();
    expect(screen.getByText(cardCounter(0, cards.length))).toBeInTheDocument();
  });

  it("should disable Next button when currentIndex is at the last card", () => {
    // Given
    render(
      <NavigationHomeControls
        cards={cards}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onMarkAsLearned={vi.fn()}
        currentIndex={cards.length - 1}
      />,
    );

    // Then
    expect(screen.getByRole("button", { name: previousButton })).toBeEnabled();
    expect(screen.getByRole("button", { name: nextButton })).toBeDisabled();
    expect(screen.getByRole("button", { name: learnedButton })).toBeEnabled();
    expect(
      screen.getByText(cardCounter(cards.length - 1, cards.length)),
    ).toBeInTheDocument();
  });

  it("should disable Learned button when current card is already learned", () => {
    // Given
    render(
      <NavigationHomeControls
        cards={cards}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onMarkAsLearned={vi.fn()}
        currentIndex={1}
      />,
    );

    // Then
    expect(screen.getByRole("button", { name: previousButton })).toBeEnabled();
    expect(screen.getByRole("button", { name: nextButton })).toBeEnabled();
    expect(screen.getByRole("button", { name: learnedButton })).toBeDisabled();
    expect(screen.getByText(cardCounter(1, cards.length))).toBeInTheDocument();
  });
});
