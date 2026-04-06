import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FilterButtons from "@/components/homeComponents/FilterButtons";
import { FilterOption } from "@/enums/filterOption";
import { uiText } from "@/constants/uiText";

const { all, new: newFilter, learned } = uiText.home.filterButton;

describe("FilterButtons", () => {
  it("renders all three filter options", () => {
    // Given
    render(
      <FilterButtons
        currentFilter={FilterOption.All}
        onFilterChange={vi.fn()}
      />,
    );

    // Then
    expect(screen.getByText(all.toLowerCase())).toBeInTheDocument();
    expect(screen.getByText(newFilter.toLowerCase())).toBeInTheDocument();
    expect(screen.getByText(learned.toLowerCase())).toBeInTheDocument();
  });

  it("calls onFilterChange with the correct filter when a button is clicked", async () => {
    // Given
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(
      <FilterButtons
        currentFilter={FilterOption.All}
        onFilterChange={onFilterChange}
      />,
    );

    // When
    await user.click(screen.getByText(newFilter.toLowerCase()));
    // Then
    expect(onFilterChange).toHaveBeenCalledWith(FilterOption.New);

    // When
    await user.click(screen.getByText(learned.toLowerCase()));
    // Then
    expect(onFilterChange).toHaveBeenCalledWith(FilterOption.Learned);
  });

  it("applies active style to the currently selected filter", () => {
    // Given
    render(
      <FilterButtons
        currentFilter={FilterOption.New}
        onFilterChange={vi.fn()}
      />,
    );

    // When
    const newButton = screen
      .getByText(newFilter.toLowerCase())
      .closest("button");
    const allButton = screen.getByText(all.toLowerCase()).closest("button");

    // Then
    expect(newButton).toHaveClass("text-[#556cd6]");
    expect(allButton).toHaveClass("text-white/40");
  });
});
