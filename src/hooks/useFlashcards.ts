import { useState, useEffect } from "react";
import type { Flashcard } from "../types/flashcard";

const STORAGE_KEY = "ai-flashcards";

const initialCards: Flashcard[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    answer: "Paris",
    isLearned: false,
  },
  {
    id: "2",
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
    isLearned: false,
  },
  {
    id: "3",
    question: "What is the chemical symbol for water?",
    answer: "H2O",
    isLearned: false,
  },
  {
    id: "4",
    question: 'Who wrote "To Kill a Mockingbird"?',
    answer: "Harper Lee",
    isLearned: false,
  },
];

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: Flashcard[] = JSON.parse(stored);
          setCards(parsed);
        } else {
          setCards(initialCards);
        }
      } catch (err) {
        console.error("Error during reading the local storage", err);
        setCards(initialCards);
      }finally{
        setLoading(false);
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards, loading]);

  const currentCard = cards[currentCardIndex];

  const moveNextHandler = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const movePreviousHandler = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const markAsLearnedHandler = () => {
    setCards((prevCards) =>
      prevCards.map((card, index) =>
        index === currentCardIndex ? { ...card, isLearned: true } : card
      )
    );
  };

  const addCard = (question: string, answer: string) => {
    const newCard: Flashcard = {
      id: crypto.randomUUID(),
      question,
      answer,
      isLearned: false,
    };
    setCards((cardsArray) => [...cardsArray, newCard]);
  };

  return {
    cards,
    currentCard,
    currentCardIndex,
    moveNextHandler,
    movePreviousHandler,
    markAsLearnedHandler,
    addCard,
    loading,
  };
}
