import "../App.css";
import FlashcardComponent from "../components/homeComponents/Flashcard/Flashcard";
import ProgressStats from "../components/homeComponents/ProgressStats";
import NavigationHomeControls from "../components/homeComponents/NavigationHomeControls";
import { useFlashcards } from "../hooks/useFlashcards";
import AddFlashcardForm from "../components/homeComponents/AddFlashcardForm";
import LoadingIndicator from "../components/homeComponents/LoadingIndicator";
import NoFlashcardIndicator from "../components/homeComponents/NoFlashcardComponent";
import EditFlashcardModal from "../components/homeComponents/EditFlashcardModal";
import type { Flashcard } from "../types/flashcard";
import FilterButtons from "../components/homeComponents/FilterButtons";
import CreateFlashcardButton from "../components/homeComponents/CreateFlashcardButton";

function Home() {
  const {
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
    isAddFlashcardFormOpen,
    setIsAddFlashcardFormOpen,
  } = useFlashcards();
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
        //TODO F: Left here with translation
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
      {editingCardId && (
        <EditFlashcardModal
          onClose={() => setEditingCardId(null)}
          editFlashcard={cardToEdit!}
          onSave={(id: string, updatedFields: Partial<Flashcard>) => {
            updateCard(id, updatedFields);
            setEditingCardId(null);
          }}
        />
      )}
    </div>
  );
}

export default Home;
