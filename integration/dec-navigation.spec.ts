import { test, expect } from "./fixtures";
import { LABELS } from "./labels";

test.describe("Deck Navigation", () => {
  test("renders deck library with title and at least one deck", async ({
    deckLibraryPage,
  }) => {
    await expect(deckLibraryPage.title).toBeVisible();
    await expect(deckLibraryPage.firstDeck()).toBeVisible();
  });

  test("navigates to the study page when a deck is selected", async ({
    deckLibraryPage,
    page,
  }) => {
    const deckName = await deckLibraryPage.selectFirstDeck();

    await expect(page).toHaveURL(
      new RegExp(`/study/${encodeURIComponent(deckName.toLowerCase())}`, "i"),
    );
    await deckLibraryPage.waitForStudyPage();
    await expect(
      page.getByRole("button", {
        name: LABELS.studyPage.filterAll,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(LABELS.studyPage.cardCounterPattern),
    ).toBeVisible();
  });

  test("shows empty state when navigating to a non-existent deck", async ({
    cleanPage,
  }) => {
    await cleanPage.goto("/study/nonexistent-deck");

    await expect(
      cleanPage.getByText(LABELS.studyPage.noCardIndicator),
    ).toBeVisible();
  });
});
