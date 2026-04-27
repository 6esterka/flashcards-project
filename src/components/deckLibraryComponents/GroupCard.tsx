import { memo } from "react";
import { motion } from "framer-motion";
import { uiText } from "@/constants/uiText";
import clsx from "clsx";

interface GroupCardProps {
  groupName: string;
  cardsCount: number;
  onSelect: (name: string) => void;
}

function GroupCardComponent({
  groupName,
  cardsCount,
  onSelect,
}: Readonly<GroupCardProps>) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(groupName)}
      className={clsx(
        "relative overflow-hidden cursor-pointer group",
        "bg-white rounded-[2rem] p-7 border-2 border-transparent",
        "shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
        "hover:border-[#556cd6]/20 hover:shadow-[0_20px_40px_rgba(85,108,214,0.1)]",
        "transition-all duration-300",
      )}
    >
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 bg-[#556cd6]/10 text-[#556cd6] rounded-full">
          {uiText.deckLibrary.groupList.cardLength(cardsCount)}
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#556cd6] group-hover:bg-[#556cd6] group-hover:text-white transition-colors duration-300">
          <ArrowIcon />
        </div>
      </div>
      <div className="relative inline-block">
        <h2 className="capitalize text-2xl font-extrabold text-slate-800 mb-2 group-hover:text-[#556cd6] transition-colors">
          {groupName}
        </h2>
        <div className="h-1 bg-[#e76f51] rounded-full w-0 group-hover:w-full transition-all duration-500" />
      </div>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#556cd6]/5 rounded-full blur-3xl group-hover:bg-[#e76f51]/10 transition-colors" />
    </motion.div>
  );
}

export const GroupCard = memo(GroupCardComponent);

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
