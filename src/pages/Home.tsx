import "@/App.css";
import FlashcardComponent from "@/components/homeComponents/Flashcard/Flashcard";
import ProgressStats from "@/components/homeComponents/ProgressStats";
import NavigationHomeControls from "@/components/homeComponents/NavigationHomeControls";
import { useFlashcards } from "@/hooks/useFlashcards";
import AddFlashcardForm from "@/components/homeComponents/AddFlashcardForm";
import LoadingIndicator from "@/components/homeComponents/LoadingIndicator";
import NoFlashcardIndicator from "@/components/homeComponents/NoFlashcardIndicator";
import EditFlashcardModal from "@/components/homeComponents/EditFlashcardModal";
import FilterButtons from "@/components/homeComponents/FilterButtons";
import CreateFlashcardButton from "@/components/homeComponents/CreateFlashcardButton";
import { AnimatePresence, motion } from "framer-motion";

function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const {
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
    // resetStore,
    loading,
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
      <AnimatePresence mode="wait">
        {filteredFlashcards.length === 0 ? (
          <FadeIn key="empty">
            <NoFlashcardIndicator />
          </FadeIn>
        ) : (
          <FadeIn key={currentCard?.id}>
            <FlashcardComponent
              card={currentCard}
              onDelete={requestDeleteCard}
              isBeingDeleted={pendingDeleteId}
              onEdit={() => setEditingCardId(currentCard.id)}
            />
          </FadeIn>
        )}
      </AnimatePresence>
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
        <AddFlashcardForm onClose={() => setIsAddFlashcardFormOpen(false)} />
      )}
      {/*TODO: Save this button here just in case of future development */}
      {/* <Button className="mt-6" variant="secondary" onClick={resetStore}>
        {uiText.home.resetStoreButton}
      </Button> */}
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
