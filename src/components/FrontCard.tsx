import type { Flashcard } from "../types/flashcard";
import EditCardButton from "./EditCardButton";
import RemoveCardButton from "./RemoveCardButton";

interface FrontCardProps {
  card: Flashcard;
  onDelete: (id: string) => void;
  onEdit:()=> void;
}

const FrontCard: React.FC<FrontCardProps> = ({ card, onDelete,onEdit }) => {
  return (
    <div
      className="absolute w-full h-full 
        backface-hidden bg-white border border-gray-300 rounded-xl shadow-md flex items-center justify-center 
        p-4 text-lg font-semibold"
    >
      <RemoveCardButton cardId={card.id} onDelete={onDelete} />
      <EditCardButton onEdit={onEdit}/>
      {card.question}
    </div>
  );
};

export default FrontCard;
