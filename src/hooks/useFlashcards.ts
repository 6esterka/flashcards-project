import { useState, useEffect, useMemo } from "react";
import { FilterOption } from "@/enums/filterOption";
import { useFlashcardStore } from "@/store/useFlashcardStore";

export function useFlashcards() {
  //Zustand Store
  const selectedGroupName = useFlashcardStore(
    (store) => store.selectedGroupName,
  );
  //TODO Put instead store.decks["Custom Deck"] [] once I'll represent groupName selection
  const cards = useFlashcardStore((store) =>
    selectedGroupName ? store.decks[selectedGroupName] : [],
  );
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
  }, [selectedGroupName]);

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
