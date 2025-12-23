export const uiText={
    generate:{
        pageTitle:"Generate Flashcards",
        inputPlaceHolder:"Enter a topic",
        generateButton:"Generate",
        successMessage: "Flashcards generated successfully!",
        errorMessage: (errorText:string|undefined) => `Flashcards generation failed: ${errorText}`
    },
    home:{
        loadingIndicatorText:"Loading flashcards...",
        filterButton:{
            new:"New",
            all:"All",
            learned:"Learned"
        },
        noCardIndicator:"No flashcards yet for this group",
        removeCardButton:"Remove card",
        navControls:{
            cardCounter:(currentIndex:number,total:number)=>`Card ${currentIndex+1} of ${total}`,
            previousButton:"← Previous",
            nextButton:"Next →",
            learnedButton:"✅ Learned"
        },
        progressStat:(learnedCount:number,totalCount:number)=>`Progress: ${learnedCount} out of ${totalCount} cards learned.`,
        createCardButton:"New Flashcard",
        addCardForm:{
            questionInputLabel:"Question",
            questionInputPlaceholder:"For ex: Who is Jimmy Neutron?",
            answerInputLabel:"Answer",
            addCardButton:"➕ Add card"
        },
        editCardForm:{
            formTitle:"Edit Flashcard",
            questionInputLabel:"Question:",
            answerInputLabel:"Answer:",
            saveButton:"Save",
            cancelButton:"Cancel"
        }
    },
    stats:{
        pageTitle:"Stats"
    }
}