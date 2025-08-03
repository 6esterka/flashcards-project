import "./App.css";
import FlashcardComponent from "./components/Flashcard";
import ProgressStats from "./components/ProgressStats";
import NavigationControls from "./components/NavigationControls";
import { useFlashcards } from "./hooks/useFlashcards";
import AddFlashcardForm from "./components/AddFlashcardForm";
import LoadingIndicator from "./components/LoadingIndicator";
import NoFlashcardIndicator from "./components/NoFlashcardComponent";
import EditFlashcardModal from "./components/EditFlashcardModal";
import type { Flashcard } from "./types/flashcard";

function App() {
  const {
    cards,
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
    cardToEdit
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
      {cards.length === 0 ? (
        <NoFlashcardIndicator />
      ) : (
        <FlashcardComponent
          card={currentCard}
          onDelete={requestDeleteCard}
          isBeingDeleted={pendingDeleteId}
          onEdit={() => setEditingCardId(currentCard.id)}
        />
      )}
      <NavigationControls
        currentIndex={currentCardIndex}
        cards={cards}
        onPrev={movePreviousHandler}
        onNext={moveNextHandler}
        onMarkAsLearned={markAsLearnedHandler}
      />
      <ProgressStats cards={cards} />
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

export default App;
