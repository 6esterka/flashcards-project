import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useFlashcards } from "@/hooks/useFlashcards";
import { useFlashcardStore, INITIAL_DATA } from "@/store/useFlashcardStore";
import { FilterOption } from "@/enums/filterOption";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={["/study/custom deck"]}>
    <Routes>
      <Route path="/study/:groupName" element={<>{children}</>} />
    </Routes>
  </MemoryRouter>
);

describe("useFlashcards", () => {
  beforeEach(() => {
    useFlashcardStore.setState({
      decks: INITIAL_DATA,
      selectedGroupName: null,
    });
  });

  describe("filtering", () => {
    it("returns all cards when filter is All", () => {
      // Given
      const { result } = renderHook(() => useFlashcards(), { wrapper });
      const totalCards = INITIAL_DATA["custom deck"].length;

      // Then
      expect(result.current.filteredFlashcards.length).toBe(totalCards);
    });
    it("returns all cards when filter is New", () => {
      //Given
      const { result } = renderHook(() => useFlashcards(), { wrapper });
      const totalCards = INITIAL_DATA["custom deck"].length;
      //When
      act(() => result.current.setFilter(FilterOption.New));
      //Then
      expect(result.current.filteredFlashcards.length).toBe(totalCards);
    });
    it("returns 0 cards when filter is learned", () => {
      //Given
      const { result } = renderHook(() => useFlashcards(), { wrapper });
      //When
      act(() => result.current.setFilter(FilterOption.Learned));
      //Then
      expect(result.current.filteredFlashcards.length).toBe(0);
    });
  });

  describe("moveNextHandler", () => {
    it("increments index", () => {
      //Given
      const { result } = renderHook(() => useFlashcards(), { wrapper });
      //When
      act(() => result.current.moveNextHandler());
      //Then
      expect(result.current.currentCardIndex).toBe(1);
    });
    it("stops at last card", () => {
      //Given
      const { result } = renderHook(() => useFlashcards(), { wrapper });
      const lastIndex = INITIAL_DATA["custom deck"].length - 1;
      act(() => {
        for (let i = 0; i < lastIndex; i++) {
          result.current.moveNextHandler();
        }
      });
      //When
      act(() => result.current.moveNextHandler());
      //Then
      expect(result.current.currentCardIndex).toBe(lastIndex);
    });
  });
  describe("movePreviousHandler", () => {
    it("stops at 0", () => {
      //Given
      const { result } = renderHook(() => useFlashcards(), { wrapper });
      //When
      act(() => result.current.movePreviousHandler());
      //Then
      expect(result.current.currentCardIndex).toBe(0);
    });
  });
  describe("markAsLearnedHandler", () => {
    it("marks current card learned", () => {
      //Given
      const { result } = renderHook(() => useFlashcards(), { wrapper });
      //When
      act(() => result.current.markAsLearnedHandler());
      //Then
      expect(
        useFlashcardStore.getState().decks["custom deck"][0].isLearned,
      ).toBe(true);
    });
  });
});
