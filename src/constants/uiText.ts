export const uiText={
    generate:{
        pageRouteTitle:"Generate",
        pageTitle:"Generate Flashcards",
        inputPlaceHolder:"Enter a topic",
        generateButton:"Generate",
        successMessage: "Flashcards generated successfully!",
        errorMessage: (errorText:string|undefined) => `Flashcards generation failed: ${errorText}`
    },
    home:{
        pageRouteTitle:"Home",
        loadingIndicatorText:"Loading flashcards...",
        filterButton:{
            new:"New",
            all:"All",
            learned:"Learned"
        },
        noCardIndicator:"No flashcards yet for this group",
        resetStoreButton:"Reset Store",
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
        pageRouteTitle:"Stats",
        totalMasteryTitle:"Total Mastery",
        learningProgressStatTitle:"Learning Progress by Deck"
    },
    deckLibrary:{
        deckLibraryTitle:"Welcome to flashcards quiz",
        deckLibrarySelectInfo: "Select the group to begin",
        groupList:{
            cardLength:(cardsLength:number)=> `${cardsLength} Cards`,
            arrowSign:"→",
            lastPracticedText:"Last practiced: Just now"
        }
    },
    general:{
        goBackButtonArrow:"←",
        goBackButtonText:"Back"
    }
}