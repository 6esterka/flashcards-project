import { FilterOption } from "@/enums/filterOption";
import { motion } from "framer-motion";

interface FilterButtonsProps {
  currentFilter: string;
  onFilterChange: (filter: FilterOption) => void;
}

function FilterButtons({
  currentFilter,
  onFilterChange,
}: Readonly<FilterButtonsProps>) {
  return (
    <div className="mb-8 flex justify-center">
      <div className="relative flex bg-black/20 backdrop-blur-lg p-1.5 rounded-full border border-white/5">
        {Object.values(FilterOption).map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(option)}
            className={`relative z-10 px-5 py-1.5 text-[15px] font-semibold transition-all duration-300 ${
              currentFilter === option ? "text-[#556cd6]" : "text-white/40 hover:text-white/70"
            }`}
          >
            <span className="capitalize">{option.toLowerCase()}</span>
            {currentFilter === option && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;
