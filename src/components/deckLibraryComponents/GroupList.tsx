import { uiText } from "@/constants/uiText";
import { useFlashcardStore } from "@/store/useFlashcardStore";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GroupCard } from "@/components/deckLibraryComponents/GroupCard";

export default function GroupList() {
  const navigate = useNavigate();
  const decks = useFlashcardStore((state) => state.decks);
  const selectGroup = useFlashcardStore((state) => state.selectGroup);
  useEffect(() => {
    selectGroup(null);
  }, [selectGroup]);
  const handleSelect = useCallback(
    (groupName: string) => {
      selectGroup(groupName);
      navigate(`/study/${groupName}`);
    },
    [navigate, selectGroup],
  );
  const deckEntries = useMemo(() => Object.entries(decks), [decks]);
  if (deckEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <p className="text-lg font-medium">{uiText.deckLibrary.noDecksText}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-4 pt-6 -mt-6 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
        {deckEntries.map(([name, cards]) => (
          <GroupCard
            key={name}
            groupName={name}
            cardsCount={cards.length}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
