import { uiText } from "@/constants/uiText";
import { useFlashcardStore } from "@/store/useFlashcardStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

//TODO Make here optimizations increase code readability
export default function GroupList() {
  const decks = useFlashcardStore((state) => state.decks);
  const selectGroup = useFlashcardStore((state) => state.selectGroup);
  const navigate = useNavigate();
  const handleSelect = (groupName: string) => {
    selectGroup(groupName);
    navigate(`/study/${groupName}`);
  };
  useEffect(() => {
    selectGroup(null);
  }, [selectGroup]);

  return (
    <div className="flex-1 overflow-y-auto pr-4 pt-6 -mt-6 custom-scrollbar">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
        {Object.entries(decks).map(([groupName, cards]) => (
          <motion.div
            key={groupName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -8 }} // Subtle vertical lift
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            onClick={() => handleSelect(groupName)}
            className={clsx(
              "relative overflow-hidden cursor-pointer group",
              "bg-white rounded-[2rem] p-7",
              "border-2 border-transparent",
              "shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
              "hover:border-[#556cd6]/20 hover:shadow-[0_20px_40px_rgba(85,108,214,0.1)]",
              "transition-all duration-300"
            )}
          >
            {/* Top Row: Badge & Action Icon */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 bg-[#556cd6]/10 text-[#556cd6] rounded-full">
                {uiText.deckLibrary.groupList.cardLength(cards.length)}
              </span>
              {/* Subtle Arrow */}
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#556cd6] group-hover:bg-[#556cd6] group-hover:text-white transition-colors duration-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title with Accent Color underline on hover */}
            <div className="relative inline-block">
              <h2 className="capitalize text-2xl font-extrabold text-slate-800 mb-2 group-hover:text-[#556cd6] transition-colors">
                {groupName}
              </h2>
              <motion.div className="h-1 bg-[#e76f51] rounded-full w-0 group-hover:w-full transition-all duration-500" />
            </div>

            {/* Subtle "Glass" background decoration */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#556cd6]/5 rounded-full blur-3xl group-hover:bg-[#e76f51]/10 transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
