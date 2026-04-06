import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AddFlashcardForm from "@/components/homeComponents/AddFlashcardForm";
import userEvent from "@testing-library/user-event";
import { uiText } from "@/constants/uiText";

const { addCardButton, questionInputLabel, answerInputLabel } =
  uiText.home.addCardForm;

describe("AddFlashcardForm", () => {
  it("should disable submit button when inputs are empty", () => {
    // Given / When
    render(<AddFlashcardForm onClose={vi.fn()} />);

    // Then
    expect(screen.getByRole("button", { name: addCardButton })).toBeDisabled();
  });
  it("should call addCard and onClose on valid submit", async () => {
    // Given
    const mockOnClose = vi.fn();
    const user = userEvent.setup();
    render(<AddFlashcardForm onClose={mockOnClose} />);
    const questionInput = screen.getByLabelText(
      questionInputLabel,
    ) as HTMLInputElement;
    const answerInput = screen.getByLabelText(
      answerInputLabel,
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: addCardButton });
    // When
    await user.type(questionInput, "What is Prague?");
    await user.type(answerInput, "The capital of Czechia.");
    await user.click(submitButton);
    // Then
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
