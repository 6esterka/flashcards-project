import { Button } from "./ui/customButton/Button";


interface CreateFlashcardButtonProps {
    readonly onCreate: () => void;
}

function CreateFlashcardButton({ onCreate }: CreateFlashcardButtonProps) {
    const onAddButtonClickHandler= (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onCreate();
    };
    return (
        <Button
            variant="secondary"
            className="mt-6"
            onClick={onAddButtonClickHandler}
        >
            New Flashcard
        </Button>
    );
}

export default CreateFlashcardButton;