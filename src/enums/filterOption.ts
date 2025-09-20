export const FilterOption = {
    All: "all",
    New: "new",
    Learned: "learned",
} as const;

export type FilterOption = typeof FilterOption[keyof typeof FilterOption];