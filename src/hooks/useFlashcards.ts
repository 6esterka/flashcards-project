import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FilterOption } from "@/enums/filterOption";
import { useFlashcardStore } from "@/store/useFlashcardStore";

export function useFlashcards() {
  //Zustand Store
  const { groupName: groupNameParam } = useParams<{ groupName: string }>();
  const decks = useFlashcardStore((store) => store.decks);
  const selectGroup = useFlashcardStore((store) => store.selectGroup);
  const cards = groupNameParam ? (decks[groupNameParam] ?? []) : [];

  useEffect(() => {
    selectGroup(groupNameParam ?? null);
  }, [groupNameParam, selectGroup]);
  const updateCard = useFlashcardStore((store) => store.updateCard);
  const resetStore = useFlashcardStore((store) => store.resetStore);

  //Local UI State
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
  const [isAddFlashcardFormOpen, setIsAddFlashcardFormOpen] = useState(false);

  const filteredFlashcards = useMemo(() => {
    return cards.filter((card) => {
      if (filter === FilterOption.Learned) return card.isLearned;
      if (filter === FilterOption.New) return !card.isLearned;
      return true;
    });
  }, [cards, filter]);

  useEffect(() => {
    setCurrentCardIndex((prev) =>
      Math.min(prev, Math.max(filteredFlashcards.length - 1, 0)),
    );
  }, [filteredFlashcards.length]);

  const currentCard = filteredFlashcards[currentCardIndex] || null;

  //Handlers
  const moveNextHandler = () => {
    setCurrentCardIndex((prev) =>
      Math.min(prev + 1, filteredFlashcards.length - 1),
    );
  };

  const movePreviousHandler = () => {
    setCurrentCardIndex((prev) => Math.max(prev - 1, 0));
  };

  const markAsLearnedHandler = () => {
    if (currentCard) {
      updateCard(currentCard.id, { isLearned: true });
    }
  };

  const requestDeleteCard = (id: string) => {
    setPendingDeleteId(id);
    setTimeout(() => {
      useFlashcardStore.getState().deleteCard(id);
      setPendingDeleteId(null);
    }, 300);
  };

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [groupNameParam]);

  return {
    filteredFlashcards,
    currentCard,
    currentCardIndex,
    moveNextHandler,
    movePreviousHandler,
    markAsLearnedHandler,
    requestDeleteCard,
    pendingDeleteId,
    setEditingCardId,
    editingCardId,
    filter,
    setFilter,
    isAddFlashcardFormOpen,
    setIsAddFlashcardFormOpen,
    resetStore,
    loading,
  };
}
