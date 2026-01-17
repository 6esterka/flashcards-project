import "@/App.css";
import FlashcardComponent from "@/components/homeComponents/Flashcard/Flashcard";
import ProgressStats from "@/components/homeComponents/ProgressStats";
import NavigationHomeControls from "@/components/homeComponents/NavigationHomeControls";
import { useFlashcards } from "@/hooks/useFlashcards";
import AddFlashcardForm from "@/components/homeComponents/AddFlashcardForm";
import LoadingIndicator from "@/components/homeComponents/LoadingIndicator";
import NoFlashcardIndicator from "@/components/homeComponents/NoFlashcardComponent";
import EditFlashcardModal from "@/components/homeComponents/EditFlashcardModal";
import FilterButtons from "@/components/homeComponents/FilterButtons";
import CreateFlashcardButton from "@/components/homeComponents/CreateFlashcardButton";
import { Button } from "@/components/ui/customButton/Button";
import { uiText } from "@/constants/uiText";

export default function Home() {
  const {
    filteredFlashcards,
    currentCard,
    currentCardIndex,
    moveNextHandler,
    movePreviousHandler,
    markAsLearnedHandler,
    // addCard,
    requestDeleteCard,
    pendingDeleteId,
    // loading,
    setEditingCardId,
    editingCardId,
    filter,
    setFilter,
    isAddFlashcardFormOpen,
    setIsAddFlashcardFormOpen,
    resetStore
  } = useFlashcards();
  const loading=null;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <FilterButtons onFilterChange={setFilter} currentFilter={filter} />
      {filteredFlashcards.length === 0 ? (
        <NoFlashcardIndicator />
      ) : (
        <FlashcardComponent
          card={currentCard}
          onDelete={requestDeleteCard}
          isBeingDeleted={pendingDeleteId}
          onEdit={() => setEditingCardId(currentCard.id)}
        />
      )}
      <NavigationHomeControls
        currentIndex={currentCardIndex}
        cards={filteredFlashcards}
        onPrev={movePreviousHandler}
        onNext={moveNextHandler}
        onMarkAsLearned={markAsLearnedHandler}
      />
      <ProgressStats cards={filteredFlashcards} />
      <CreateFlashcardButton onCreate={() => setIsAddFlashcardFormOpen(true)} />
      {isAddFlashcardFormOpen && (
        <AddFlashcardForm
          onAddFlashcard={addCard}
          onClose={() => setIsAddFlashcardFormOpen(false)}
        />
      )}
      <Button className="mt-6" variant="secondary" onClick={resetStore}>
        {uiText.home.resetStoreButton}
      </Button>
      {editingCardId && (
        <EditFlashcardModal
          onClose={() => setEditingCardId(null)}
          editingCardId={editingCardId}
          setEditingCardId={setEditingCardId}
        />
      )}
    </div>
  );
}
