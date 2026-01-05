import {create} from 'zustand';
import type { Flashcard } from '@/types/flashcard';
import {persist} from 'zustand/middleware';
import { nanoid } from 'nanoid';

interface FlashcardStore {
    decks: Record<string,Flashcard[]>;
    selectedGroupName: string|null;
    addDeck: (groupName:string,cards:Flashcard[])=>void;
    selectGroup: (groupName:string)=>void;
}

const INITIAL_DATA: Record<string,Flashcard[]>={
    "Custom Deck":[
          {
            id: nanoid(),
            question: "What is the capital of France?",
            answer: "Paris",
            isLearned: false,
            groupName: "Custom"
          },
          {
            id: nanoid(),
            question: "What is the largest planet in our solar system?",
            answer: "Jupiter",
            isLearned: false,
            groupName: "Custom"
          },
          {
            id: nanoid(),
            question: "What is the chemical symbol for water?",
            answer: "H2O",
            isLearned: false,
            groupName: "Custom"
          },
          {
            id: nanoid(),
            question: 'Who wrote "To Kill a Mockingbird"?',
            answer: "Harper Lee",
            isLearned: false,
            groupName: "Custom"
          },
    ]
}

export const useFlashcardStore = create<FlashcardStore>()(
    persist((set)=>({
        decks:INITIAL_DATA,
        selectedGroupName:null,
        addDeck:(groupName,cards)=>{
            set((state)=>({
                decks:{...state.decks,[groupName]:cards}
            }))
        },
        selectGroup:(groupName)=>set({selectedGroupName:groupName})
    }),{name:'flashcard-storage'})
)

