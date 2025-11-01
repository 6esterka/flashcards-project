import { FilterOption } from "@/enums/filterOption";

interface FilterButtonsProps {
  currentFilter: string;
  onFilterChange: (filter: FilterOption) => void;
}

function FilterButtons({ currentFilter, onFilterChange }: Readonly<FilterButtonsProps>) {
  return (
    <div className="mb-4 flex gap-4">
      {Object.values(FilterOption).map((option) => (
        <button
          key={option}
          onClick={() => onFilterChange(option)}
          className={currentFilter === option ? "font-bold underline" : ""}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
