import { describe, it, expect, beforeEach } from "vitest";
import { useFlashcardStore, INITIAL_DATA } from "@/store/useFlashcardStore";
import type { Flashcard } from "@/types/flashcard";

describe("useFlashcardStore", () => {
  beforeEach(() => {
    useFlashcardStore.setState({
      decks: INITIAL_DATA,
      selectedGroupName: null,
    });
  });

  describe("addDeck", () => {
    it("adds a new deck with the given cards", () => {
      // Given
      const { addDeck } = useFlashcardStore.getState();
      const cards = [{ id: "1", question: "Q", answer: "A", isLearned: false }];

      // When
      addDeck("my deck", cards);

      // Then
      const decks = useFlashcardStore.getState().decks;
      expect(decks["my deck"]).toEqual(cards);
    });
  });

  describe("addCard", () => {
    it("adds a new card with given question and answer", () => {
      //Given
      const { addCard, selectGroup } = useFlashcardStore.getState();
      const selectedGroup = "custom deck";
      selectGroup(selectedGroup);
      const question = "What is main phrase of Mandalorian people";
      const answer = "This is the way";
      //When
      addCard(question, answer);
      //Then
      const addedCard = useFlashcardStore
        .getState()
        .decks[
          selectedGroup
        ].find((card) => card.answer === answer && card.question === question);
      expect(addedCard).toBeDefined();
      expect(addedCard?.question).toBe(question);
      expect(addedCard?.answer).toBe(answer);
      expect(addedCard?.isLearned).toBe(false);
    });
  });

  describe("deleteCard", () => {
    it("delete a correct card", () => {
      //Given
      const { deleteCard, selectGroup } = useFlashcardStore.getState();
      const selectedGroup = "custom deck";
      selectGroup(selectedGroup);
      const cardForDeletion =
        useFlashcardStore.getState().decks[selectedGroup][0];
      //When
      deleteCard(cardForDeletion.id);
      //Then
      const deletedCard = useFlashcardStore
        .getState()
        .decks[selectedGroup].find((card) => card.id === cardForDeletion.id);
      expect(deletedCard).toBeUndefined();
    });
  });

  describe("updateCard", () => {
    it("updates some fields of existing card", () => {
      //Given
      const { updateCard, selectGroup } = useFlashcardStore.getState();
      const selectedGroup = "custom deck";
      selectGroup(selectedGroup);
      const cardForUpdate =
        useFlashcardStore.getState().decks[selectedGroup][0];
      const updatedFields: Partial<Flashcard> = {
        question: "Who is Albert Einstein",
        isLearned: true,
      };
      //When
      updateCard(cardForUpdate.id, updatedFields);
      //Then
      const updatedCard = useFlashcardStore
        .getState()
        .decks[selectedGroup].find((card) => card.id === cardForUpdate.id);
      expect(updatedCard?.question).toBe(updatedFields.question);
      expect(updatedCard?.isLearned).toBe(updatedFields.isLearned);
      expect(updatedCard?.answer).toBe(cardForUpdate.answer);
    });
  });

  describe("selectGroup", () => {
    it("select correct group", () => {
      //Given
      const { selectGroup } = useFlashcardStore.getState();
      const expectedSelectedGroup = "custom deck";
      //When
      selectGroup(expectedSelectedGroup);
      //Then
      const { selectedGroupName } = useFlashcardStore.getState();
      expect(expectedSelectedGroup).toBe(selectedGroupName);
    });
  });

  describe("resetStore", () => {
    it("Resets whole storage", () => {
      // Given — dirty state
      const { addDeck, resetStore } = useFlashcardStore.getState();
      addDeck("temporary deck", []);

      // When
      resetStore();

      // Then
      const { decks } = useFlashcardStore.getState();
      expect(decks["temporary deck"]).toBeUndefined();
      expect(decks["custom deck"]).toBeDefined();
    });
  });
});
