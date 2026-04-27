import { test, expect } from "./fixtures";

const DECK = "custom deck";

test.describe("Stats Page", () => {
  test("Shows 0% mastery when no cards are learned", async ({ statsPage }) => {
    const { page: sp } = await statsPage(DECK);
    await expect(sp.totalMastery).toBeVisible();
    await expect(sp.checkMasteryPercentage(0)).toBeVisible();
  });

  test("mastery percentage updates after marking a card as learned", async ({
    statsPage,
  }) => {
    const { page: sp, total } = await statsPage(DECK, async (studyPage) => {
      await studyPage.learnedButton.click();
    });
    await expect(sp.totalMastery).toBeVisible();
    const expectedPercentage = Math.round((1 / total) * 100);
    await expect(sp.checkMasteryPercentage(expectedPercentage)).toBeVisible();
  });

  test("displays a bar for each deck in the chart", async ({ statsPage }) => {
    const { page: sp } = await statsPage(DECK);
    await expect(sp.chart).toBeVisible();
    await expect(sp.deckBarLabel(DECK)).toBeVisible();
  });
});
