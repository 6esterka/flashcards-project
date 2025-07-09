import "./App.css";
import FlashcardComponent from "./components/Flashcard";
import ProgressStats from "./components/ProgressStats";
import NavigationControls from "./components/NavigationControls";
import { useFlashcards } from "./hooks/useFlashcards";
import AddFlashcardForm from "./components/AddFlashcardForm";


function App() {
  const{cards,currentCard,currentCardIndex,moveNextHandler,movePreviousHandler,markAsLearnedHandler,addCard} = useFlashcards();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <FlashcardComponent card={currentCard} />
      <NavigationControls
        currentIndex={currentCardIndex}
        cards={cards}
        onPrev={movePreviousHandler}
        onNext={moveNextHandler}
        onMarkAsLearned={markAsLearnedHandler}
      />
      <ProgressStats cards={cards} />
      <AddFlashcardForm onAddFlashcard={addCard}/>
    </div>
  );
}

export default App;
