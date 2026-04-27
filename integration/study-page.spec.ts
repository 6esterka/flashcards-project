import { test, expect } from "./fixtures";

const DECK = "custom deck";

test.describe("Study page", () => {
  test("filter defaults to All on load", async ({ studyPage }) => {
    const sp = await studyPage(DECK);

    await expect(sp.filterAll).toHaveAttribute("aria-pressed", "true");
    await expect(sp.filterNew).toHaveAttribute("aria-pressed", "false");
    await expect(sp.filterLearned).toHaveAttribute("aria-pressed", "false");
  });

  test("switching to Learned filter shows empty state when no cards are learned", async ({
    studyPage,
  }) => {
    const sp = await studyPage(DECK);

    await sp.filterLearned.click();

    await expect(sp.noCardIndicator).toBeVisible();
    await expect(sp.learnedButton).toBeDisabled();
    await expect(sp.nextButton).toBeDisabled();
    await expect(sp.prevButton).toBeDisabled();
  });

  test("switching back to All restores cards after Learned filter", async ({
    studyPage,
  }) => {
    const sp = await studyPage(DECK);
    const total = await sp.getTotalCards();

    await sp.filterLearned.click();
    await expect(sp.noCardIndicator).toBeVisible();

    await sp.filterAll.click();
    await expect(sp.cardCounter(0, total)).toBeVisible();
  });

  test("marking a card as learned disables the Learned button and updates progress", async ({
    studyPage,
  }) => {
    const sp = await studyPage(DECK);
    const total = await sp.getTotalCards();

    await expect(sp.learnedButton).toBeEnabled();
    await sp.learnedButton.click();

    await expect(sp.learnedButton).toBeDisabled();
    await expect(sp.progressStat(1, total)).toBeVisible();
  });

  test("learned cards appear under Learned filter after marking", async ({
    studyPage,
  }) => {
    const sp = await studyPage(DECK);

    await sp.learnedButton.click();
    await sp.filterLearned.click();

    await expect(sp.cardCounter(0, 1)).toBeVisible();
    await expect(sp.learnedButton).toBeDisabled();
  });

  test("Previous is disabled on the first card and Next is disabled on the last card", async ({
    studyPage,
  }) => {
    const sp = await studyPage(DECK);
    const total = await sp.getTotalCards();

    await expect(sp.prevButton).toBeDisabled();
    await expect(sp.nextButton).toBeEnabled();

    await sp.navigateToLastCard();

    await expect(sp.cardCounter(total - 1, total)).toBeVisible();
    await expect(sp.nextButton).toBeDisabled();
    await expect(sp.prevButton).toBeEnabled();
  });

  test("card counter updates correctly when navigating", async ({
    studyPage,
  }) => {
    const sp = await studyPage(DECK);
    const total = await sp.getTotalCards();

    await expect(sp.cardCounter(0, total)).toBeVisible();

    await sp.nextButton.click();
    await expect(sp.cardCounter(1, total)).toBeVisible();

    await sp.nextButton.click();
    await expect(sp.cardCounter(2, total)).toBeVisible();
  });
});
