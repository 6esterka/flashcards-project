import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressStats from "@/components/homeComponents/ProgressStats";
import type { Flashcard } from "@/types/flashcard";

describe("ProgressStats", () => {
  it("should render the correct progress text based on the cards prop", () => {
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
    render(<ProgressStats cards={cards} />);
    expect(
      screen.getByText("Progress: 1 out of 2 cards learned."),
    ).toBeInTheDocument();
  });
  it("should not render anything if there are no cards", () => {
    const { container } = render(<ProgressStats cards={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
