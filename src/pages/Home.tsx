import "../App.css";
import FlashcardComponent from "../components/Flashcard/Flashcard";
import ProgressStats from "../components/ProgressStats";
import NavigationHomeControls from "../components/NavigationHomeControls";
import { useFlashcards } from "../hooks/useFlashcards";
import AddFlashcardForm from "../components/AddFlashcardForm";
import LoadingIndicator from "../components/LoadingIndicator";
import NoFlashcardIndicator from "../components/NoFlashcardComponent";
import EditFlashcardModal from "../components/EditFlashcardModal";
import type { Flashcard } from "../types/flashcard";
import FilterButtons from "../components/FilterButtons";

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
    setFilter
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
        <FilterButtons onFilterChange={setFilter} currentFilter={filter}/>
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
      <AddFlashcardForm onAddFlashcard={addCard} />
      {editingCardId && (
        <EditFlashcardModal
          onClose={() => setEditingCardId(null)}
          editFlashcard={cardToEdit!}
          onSave={(id:string,updatedFields:Partial<Flashcard>)=>{
            updateCard(id,updatedFields);
            setEditingCardId(null);
          }}
        />
      )}
    </div>
  );
}

export default Home;