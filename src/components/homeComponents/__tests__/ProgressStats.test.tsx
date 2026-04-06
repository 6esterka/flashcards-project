import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressStats from "@/components/homeComponents/ProgressStats";
import type { Flashcard } from "@/types/flashcard";
import { uiText } from "@/constants/uiText";

describe("ProgressStats", () => {
  it("should render the correct progress text based on the cards prop", () => {
    // Given
    const cards: Flashcard[] = [
      {
        id: "1",
        question: "What is React?",
        answer: "A JavaScript library for building user interfaces",
        isLearned: true,
      },
      {
        id: "2",
        question: "What is a component?",
        answer: "A reusable piece of UI in React",
        isLearned: false,
      },
    ];

    // When
    render(<ProgressStats cards={cards} />);

    // Then
    expect(
      screen.getByText(uiText.home.progressStat(1, 2)),
    ).toBeInTheDocument();
  });
  it("should not render anything if there are no cards", () => {
    // Given / When
    const { container } = render(<ProgressStats cards={[]} />);

    // Then
    expect(container).toBeEmptyDOMElement();
  });
});
