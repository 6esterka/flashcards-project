import "./App.css";
import FlashcardComponent from "./components/Flashcard";
import ProgressStats from "./components/ProgressStats";
import NavigationControls from "./components/NavigationControls";
import { useFlashcards } from "./hooks/useFlashcards";


function App() {
  const{cards,currentCard,currentCardIndex,moveNextHandler,movePreviousHandler,markAsLearnedHandler} = useFlashcards();
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
    </div>
  );
}

export default App;
