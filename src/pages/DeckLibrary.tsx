import GroupList from "@/components/deckLibraryComponents/GroupList";
import { uiText } from "@/constants/uiText";

export default function DeckLibrary() {
  return (
    <div className="flex flex-col h-screen bg-[#f8f9fc] p-6 lg:p-12">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Your Decks
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Select a session to begin
        </p>
      </header>
      <GroupList />
    </div>
  );
}
