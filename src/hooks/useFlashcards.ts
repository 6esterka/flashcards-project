import { useState, useEffect } from "react";
import type { Flashcard } from "../types/flashcard";
import { FilterOption } from "../enums/filterOption";

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
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
  const filteredFlashcards = cards.filter((card: Flashcard) => {
    if (filter === FilterOption.All) return true;
    if (filter === FilterOption.Learned) return card.isLearned;
    if (filter === FilterOption.New) return !card.isLearned;
    return true;
  });

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
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
  if (filteredFlashcards.length === 0) {
    setCurrentCardIndex(0);
  } else if (currentCardIndex >= filteredFlashcards.length) {
    setCurrentCardIndex(0);
  }
}, [filteredFlashcards, currentCardIndex]);

  useEffect(() => {
    if (!loading) {
      localStorage.removeItem("ai-flashcards");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards, loading]);

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [filter]);

  const currentCard = filteredFlashcards[currentCardIndex];

  const moveNextHandler = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex < filteredFlashcards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const movePreviousHandler = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const markAsLearnedHandler = () => {
    const id = filteredFlashcards[currentCardIndex]?.id;
    if (!id) return;

    setCards((cardsArray) =>
      cardsArray.map((card) =>
        card.id === id ? { ...card, isLearned: true } : card
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

  const requestDeleteCard = (id: string) => {
    setPendingDeleteId(id);

    setTimeout(() => {
      setCards((cardsArray) => {
        const newCards = cardsArray.filter((card) => card.id !== id);
        //Keep this const if you would like to set change index logic during deleting card
        const deleteCardIndex = cardsArray.findIndex((card) => card.id === id);

        const newIndex = Math.min(currentCardIndex, newCards.length - 1);
        setCurrentCardIndex(newIndex >= 0 ? newIndex : 0);
        return newCards;
      });
      setPendingDeleteId(null);
    }, 300);
  };

  const updateCard = (id: string, updatedFields: Partial<Flashcard>) => {
    setCards((cardsArray) =>
      cardsArray.map((card) =>
        card.id === id ? { ...card, ...updatedFields } : card
      )
    );
    setEditingCardId(null);
  };
  const cardToEdit = cards.find((card) => card.id === editingCardId);

  return {
    filteredFlashcards,
    currentCard,
    currentCardIndex,
    moveNextHandler,
    movePreviousHandler,
    markAsLearnedHandler,
    addCard,
    requestDeleteCard,
    pendingDeleteId,
    loading,
    setEditingCardId,
    editingCardId,
    updateCard,
    cardToEdit,
    filter,
    setFilter,
  };
}
