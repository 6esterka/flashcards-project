import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FilterButtons from "@/components/homeComponents/FilterButtons";
import { FilterOption } from "@/enums/filterOption";

describe("FilterButtons", () => {
  it("renders all three filter options", () => {
    render(
      <FilterButtons
        currentFilter={FilterOption.All}
        onFilterChange={vi.fn()}
      />,
    );

    expect(screen.getByText("all")).toBeInTheDocument();
    expect(screen.getByText("new")).toBeInTheDocument();
    expect(screen.getByText("learned")).toBeInTheDocument();
  });

  it("calls onFilterChange with the correct filter when a button is clicked", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    render(
      <FilterButtons
        currentFilter={FilterOption.All}
        onFilterChange={onFilterChange}
      />,
    );

    await user.click(screen.getByText("new"));
    expect(onFilterChange).toHaveBeenCalledWith(FilterOption.New);

    await user.click(screen.getByText("learned"));
    expect(onFilterChange).toHaveBeenCalledWith(FilterOption.Learned);
  });

  it("applies active style to the currently selected filter", () => {
    render(
      <FilterButtons
        currentFilter={FilterOption.New}
        onFilterChange={vi.fn()}
      />,
    );

    const newButton = screen.getByText("new").closest("button");
    const allButton = screen.getByText("all").closest("button");

    expect(newButton).toHaveClass("text-[#556cd6]");
    expect(allButton).toHaveClass("text-white/40");
  });
});
