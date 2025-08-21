

interface CreateFlashcardButtonProps {
    readonly onCreate: () => void;
}

function CreateFlashcardButton({ onCreate }: CreateFlashcardButtonProps) {
    const onAddButtonClickHandler= (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onCreate();
    };
    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6"
            onClick={onAddButtonClickHandler}
        >
            New Flashcard
        </button>
    );
}

export default CreateFlashcardButton;