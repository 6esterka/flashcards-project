import { create } from "zustand";
import type { Flashcard } from "@/types/flashcard";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

interface FlashcardStore {
  decks: Record<string, Flashcard[]>;
  selectedGroupName: string | null;
  // Actions
  addDeck: (groupName: string, cards: Flashcard[]) => void;
  selectGroup: (groupName: string | null) => void;
  deleteCard: (cardId: string) => void;
  resetStore: () => void;
  updateCard: (cardId: string, updatedFields: Partial<Flashcard>) => void;
  addCard: (question: string, answer: string) => void;
}

const INITIAL_DATA: Record<string, Flashcard[]> = {
  "Custom Deck": [
    {
      id: nanoid(),
      question: "What is the capital of France?",
      answer: "Paris",
      isLearned: false,
    },
    {
      id: nanoid(),
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
      isLearned: false,
    },
    {
      id: nanoid(),
      question: "What is the chemical symbol for water?",
      answer: "H2O",
      isLearned: false,
    },
    {
      id: nanoid(),
      question: 'Who wrote "To Kill a Mockingbird"?',
      answer: "Harper Lee",
      isLearned: false,
    },
  ],
};

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      decks: INITIAL_DATA,
      selectedGroupName: null as string | null,
      addDeck: (groupName, cards) => {
        const formattedGroupName = groupName.trim().toLowerCase();
        set((state) => ({
          decks: {
            ...state.decks,
            [formattedGroupName]: state.decks[formattedGroupName]
              ? [...state.decks[formattedGroupName], ...cards]
              : cards,
          },
        }));
      },
      resetStore: () =>
        set({
          decks: INITIAL_DATA,
        }),
      selectGroup: (groupName) => set({ selectedGroupName: groupName }),
      deleteCard: (cardId: string) => {
        const groupName = get().selectedGroupName;
        if (!groupName) return;

        set((state) => ({
          decks: {
            ...state.decks,
            [groupName]: state.decks[groupName].filter(
              (card) => card.id !== cardId,
            ),
          },
        }));
      },
      updateCard: (cardId: string, updatedFields: Partial<Flashcard>) => {
        const groupName = get().selectedGroupName;
        if (!groupName) return;

        set((state) => ({
          decks: {
            ...state.decks,
            [groupName]: state.decks[groupName].map((card) =>
              card.id === cardId ? { ...card, ...updatedFields } : card,
            ),
          },
        }));
      },
      addCard: (question: string, answer: string) => {
        const groupName = get().selectedGroupName;
        if (!groupName) return;

        const newFlashcard = {
          id: nanoid(),
          question: question,
          answer: answer,
          isLearned: false,
        };

        set((state) => ({
          decks: {
            ...state.decks,
            [groupName]: [...(state.decks[groupName] || []), newFlashcard],
          },
        }));
      },
    }),
    {
      name: "flashcard-storage",
      partialize: (state) => ({
        decks: state.decks,
        selectedGroupName: state.selectedGroupName,
      }),
    },
  ),
);
