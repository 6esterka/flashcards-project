import { uiText } from "@/constants/uiText";
import { Button } from "@/components/ui/customButton/Button";

interface CreateFlashcardButtonProps {
  onCreate: () => void;
}

export default function CreateFlashcardButton({
  onCreate,
}: Readonly<CreateFlashcardButtonProps>) {
  const onAddButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    onCreate();
  };
  return (
    <Button
      variant="secondary"
      className="mt-6"
      onClick={onAddButtonClickHandler}
    >
      {uiText.home.createCardButton}
    </Button>
  );
}
