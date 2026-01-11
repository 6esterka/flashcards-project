import { create } from "zustand";
import type { Flashcard } from "@/types/flashcard";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

interface FlashcardStore {
  decks: Record<string, Flashcard[]>;
  selectedGroupName: string | null;
  addDeck: (groupName: string, cards: Flashcard[]) => void;
  selectGroup: (groupName: string) => void;
  deleteCard: (groupName:string,cardId:string)=>void;
  resetStore: ()=>void;
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
      //TODO Should return back to null after representing group selection page
      selectedGroupName: "Custom Deck",
      addDeck: (groupName, cards) => {
        set((state) => ({
          decks: { ...state.decks, [groupName]: cards },
        }));
      },
      resetStore: () => set({ 
        decks: INITIAL_DATA
      }),
      selectGroup: (groupName) => set({ selectedGroupName: groupName }),
      deleteCard: (groupName:string,cardId:string)=>set((state)=>({
        decks: {
            ...state.decks,
            [groupName]:state.decks[groupName].filter((card)=>card.id!==cardId)
        }
      }))
    }),
    { name: "flashcard-storage" }
  )
);
