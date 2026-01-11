import { useState, useEffect,useMemo } from "react";
import type { Flashcard } from "@/types/flashcard";
import { FilterOption } from "@/enums/filterOption";
import { useFlashcardStore } from "@/store/useFlashcardStore";

const STORAGE_KEY = "ai-flashcards";

//TODO Temporary solution will be reworked once dev will include FlashcardView and FlashcardStore properly
// const initialCards: Flashcard[] = [
//   {
//     id: nanoid(),
//     question: "What is the capital of France?",
//     answer: "Paris",
//     isLearned: false,
//     groupName: "Custom"
//   },
//   {
//     id: nanoid(),
//     question: "What is the largest planet in our solar system?",
//     answer: "Jupiter",
//     isLearned: false,
//     groupName: "Custom"
//   },
//   {
//     id: nanoid(),
//     question: "What is the chemical symbol for water?",
//     answer: "H2O",
//     isLearned: false,
//     groupName: "Custom"
//   },
//   {
//     id: nanoid(),
//     question: 'Who wrote "To Kill a Mockingbird"?',
//     answer: "Harper Lee",
//     isLearned: false,
//     groupName: "Custom"
//   },
// ];

export function useFlashcardsFoo() {
  const INITIAL_CARDS=useFlashcardStore((state)=>state.decks["Custom Deck"]);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
  const [isAddFlashcardFormOpen, setIsAddFlashcardFormOpen] = useState(false);
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
          setCards(INITIAL_CARDS);
        }
      } catch (err) {
        console.error("Error during reading the local storage", err);
        setCards(INITIAL_CARDS);
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
      isLearned: false
    };
    setCards((cardsArray) => [...cardsArray, newCard]);
  };

  const requestDeleteCard = (id: string) => {
    setPendingDeleteId(id);

    setTimeout(() => {
      setCards((cardsArray) => {
        const newCards = cardsArray.filter((card) => card.id !== id);
        //Keep this const if you would like to set change index logic during deleting card
        // const deleteCardIndex = cardsArray.findIndex((card) => card.id === id);

        const newIndex = Math.min(currentCardIndex, newCards.length - 1);
        setCurrentCardIndex(Math.max(newIndex, 0));
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
    isAddFlashcardFormOpen,
    setIsAddFlashcardFormOpen,
  };
}

export function useFlashcards(){
  //TODO Work in progress should get rid of prop drill for addCard and other hooks 
  //Zustand Store
  const selectedGroupName=useFlashcardStore((store)=>store.selectedGroupName);
  //TODO Put instead store.decks["Custom Deck"] [] once I'll represent groupName selection
  const cards = useFlashcardStore((store)=> selectedGroupName ? store.decks[selectedGroupName]:store.decks["Custom Deck"]);
  const updateCard = useFlashcardStore((store)=> store.updateCard);
  const addCardToStore=useFlashcardStore((store)=>store.addCard);
  const resetStore=useFlashcardStore((store)=>store.resetStore);

  //Local UI State
  const [currentCardIndex,setCurrentCardIndex]=useState(0);
  const [pendingDeleteId,setPendingDeleteId]=useState<string|null>(null);
  const [editingCardId,setEditingCardId]=useState<string|null>(null);
  const [filter,setFilter]=useState<FilterOption>(FilterOption.All);
  const [isAddFlashcardFormOpen,setIsAddFlashcardFormOpen]=useState(false);
  
  const filteredFlashcards =useMemo(()=>{
    return cards.filter((card)=>{
      if(filter===FilterOption.Learned) return card.isLearned;
      if(filter===FilterOption.New) return !card.isLearned;
      return true;
    })
  },[cards,filter])

  const currentCard=filteredFlashcards[currentCardIndex];

  //Handlers
  const moveNextHandler=()=>{
    setCurrentCardIndex(prev=>Math.min(prev+1,filteredFlashcards.length-1));
  }

  const movePreviousHandler=()=>{
    setCurrentCardIndex(prev=>Math.max(prev-1,0));
  }

  const markAsLearnedHandler=()=>{
    if(currentCard&&selectedGroupName){
      updateCard(selectedGroupName,{...currentCard,isLearned:true})
    }
  }

  const requestDeleteCard=(id:string)=>{
    setPendingDeleteId(id);
    setTimeout(()=>{
      useFlashcardStore.getState().deleteCard(selectedGroupName!, id);
      setPendingDeleteId(null);
    },300)
  };

  const cardToEdit=cards.find((card) => card.id === editingCardId);
  return{
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
    cardToEdit,
    resetStore
  };
}
//TODO Suggested refactoring for making it Senior Look like
// import { useState, useMemo } from "react";
// import type { Flashcard } from "@/types/flashcard";
// import { FilterOption } from "@/enums/filterOption";
// import { useFlashcardStore } from "@/store/useFlashcardStore";

// export function useFlashcards() {
//   // 1. Get Data and Actions from Zustand
//   const selectedGroupName = useFlashcardStore((s) => s.selectedGroupName);
//   const cards = useFlashcardStore((s) => selectedGroupName ? s.decks[selectedGroupName] : []);
//   const updateCard = useFlashcardStore((s) => s.updateCard); // You should add this to your store
//   const addCardToStore = useFlashcardStore((s) => s.addCard); // You should add this to your store

//   // 2. Local UI State (Does not need to persist globally)
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);
//   const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
//   const [editingCardId, setEditingCardId] = useState<string | null>(null);
//   const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
//   const [isAddFlashcardFormOpen, setIsAddFlashcardFormOpen] = useState(false);

//   // 3. Derived State (Filtered Cards)
//   const filteredFlashcards = useMemo(() => {
//     return cards.filter((card) => {
//       if (filter === FilterOption.Learned) return card.isLearned;
//       if (filter === FilterOption.New) return !card.isLearned;
//       return true;
//     });
//   }, [cards, filter]);

//   const currentCard = filteredFlashcards[currentCardIndex];

//   // 4. Clean Handlers
//   const moveNextHandler = () => {
//     setCurrentCardIndex(prev => Math.min(prev + 1, filteredFlashcards.length - 1));
//   };

//   const movePreviousHandler = () => {
//     setCurrentCardIndex(prev => Math.max(prev - 1, 0));
//   };

//   const markAsLearnedHandler = () => {
//     if (currentCard && selectedGroupName) {
//       updateCard(selectedGroupName, { ...currentCard, isLearned: true });
//     }
//   };

//   const requestDeleteCard = (id: string) => {
//     setPendingDeleteId(id);
//     // You can keep the timeout for your exit animation
//     setTimeout(() => {
//       // Call Zustand delete action
//       useFlashcardStore.getState().deleteCard(selectedGroupName!, id);
//       setPendingDeleteId(null);
//     }, 300);
//   };

//   return {
//     filteredFlashcards,
//     currentCard,
//     currentCardIndex,
//     moveNextHandler,
//     movePreviousHandler,
//     markAsLearnedHandler,
//     requestDeleteCard,
//     pendingDeleteId,
//     setEditingCardId,
//     editingCardId,
//     filter,
//     setFilter,
//     isAddFlashcardFormOpen,
//     setIsAddFlashcardFormOpen,
//     // Note: cardToEdit is just a simple find
//     cardToEdit: cards.find(c => c.id === editingCardId),
//   };
// }