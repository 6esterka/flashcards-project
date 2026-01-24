import { create } from "zustand";
import type { Flashcard } from "@/types/flashcard";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

interface FlashcardStore {
  decks: Record<string, Flashcard[]>;
  selectedGroupName: string | null;
  addDeck: (groupName: string, cards: Flashcard[] | undefined) => void;
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
    (set) => ({
      decks: INITIAL_DATA,
      selectedGroupName: null,
      addDeck: (groupName, cards) => {
        if (!cards) {
          throw new Error("Cards are undefined");
        }
        set((state) => {
          const deckExists = groupName in state.decks;
          return {
            decks: {
              ...state.decks,
              [groupName]: deckExists
                ? [...state.decks[groupName], ...cards]
                : cards,
            },
          };
        });
      },
      resetStore: () =>
        set({
          decks: INITIAL_DATA,
        }),
      selectGroup: (groupName) => set({ selectedGroupName: groupName }),
      deleteCard: (cardId: string) =>
        set((state) => {
          const groupName = state.selectedGroupName;
          if (!groupName) {
            console.warn("Attempted to delete card without a selected group");
            return state;
          }
          return {
            decks: {
              ...state.decks,
              [groupName]: state.decks[groupName].filter(
                (card) => card.id !== cardId
              ),
            },
          };
        }),
      updateCard: (cardId: string, updatedFields: Partial<Flashcard>) =>
        set((state) => {
          const groupName = state.selectedGroupName;
          if (!groupName) {
            console.warn("Attempted to update card without selected group");
            return state;
          }
          const currentGroupCards = state.decks[groupName];
          const updatedCards = currentGroupCards.map((cardItem: Flashcard) => {
            return cardItem.id === cardId
              ? { ...cardItem, ...updatedFields }
              : cardItem;
          });
          return {
            decks: { ...state.decks, [groupName]: updatedCards },
          };
        }),
      addCard: (question: string, answer: string) =>
        set((state) => {
          const groupName = state.selectedGroupName;
          if (!groupName) {
            console.warn("Attempted to add a card without selected group");
            return state;
          }
          const newFlashcard = {
            id: nanoid(),
            question: question,
            answer: answer,
            isLearned: false,
          };
          return {
            decks: {
              ...state.decks,
              [groupName]: [...state.decks[groupName], newFlashcard],
            },
          };
        }),
    }),
    { name: "flashcard-storage" }
  )
);
