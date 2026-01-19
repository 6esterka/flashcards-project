import { useFlashcardStore } from "@/store/useFlashcardStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GroupList() {
  const decks = useFlashcardStore((state) => state.decks);
  const selectGroup = useFlashcardStore((state) => state.selectGroup);
  const navigate = useNavigate();
  const handleSelect = (groupName: string) => {
    selectGroup(groupName);
    navigate(`/study/${groupName}`);
  };
  //TODO 1 Should think how I may process nullifying groupName
  //TODO 2 Should move translations to uiText
  //TODO 3 Should create back button from Home
  //TODO 4 Should bind generation in Generate section and decks in Zustand
  //TODO 4.1 Should fix the CSS styling in DeckList to make it more App related
  //TODO (Additional step) Implement when the user last entered to the deck
  //TODO 5 Should discover how to use Graphs to display statistic about the Cards
  //TODO 6 Implement the design of the Graphs
  //TODO 7 Bind it to the whole data
  //TODO 8 Write a description to the project 
  //TODO 9 Write the unit tests
    useEffect(() => {
        selectGroup(null); 
    },[]);
    /* 
        SCROLLABLE CONTAINER 
        - h-full: Uses available space
        - overflow-y-auto: Enables vertical scrolling
        - custom scrollbar classes for a sleek 2026 look
      */
  return (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
        {Object.entries(decks).map(([groupName, cards], index) => (
          <motion.div
            key={groupName}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => handleSelect(groupName)}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-transparent hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                {cards.length} Cards
              </span>
              <div className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {groupName}
            </h2>
            <div className="text-gray-400 text-sm italic">
              Last practiced: Just now
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
