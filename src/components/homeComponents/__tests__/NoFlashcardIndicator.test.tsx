import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NoFlashcardIndicator from "@/components/homeComponents/NoFlashcardIndicator";
import { uiText } from "@/constants/uiText";

describe("NoFlashcardIndicator", () => {
  it("renders the empty state message", () => {
    // Given / When
    render(<NoFlashcardIndicator />);

    // Then
    expect(screen.getByText(uiText.home.noCardIndicator)).toBeInTheDocument();
  });
});
