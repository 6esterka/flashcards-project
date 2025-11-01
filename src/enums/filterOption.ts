import { uiText } from "@/constants/uiText";

export const FilterOption = {
    All: uiText.home.filterButton.all,
    New: uiText.home.filterButton.new,
    Learned: uiText.home.filterButton.learned,
} as const;

export type FilterOption = typeof FilterOption[keyof typeof FilterOption];