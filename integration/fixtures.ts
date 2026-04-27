import { test as base, type Page } from "@playwright/test";
import { StudyPage } from "./pages/StudyPage";
import { DeckLibraryPage } from "./pages/DeckLibraryPage";
import { StatsPage } from "./pages/StatsPage";
import { LABELS } from "./labels";

async function clearStorage(page: Page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
}

type StatsPageReturnType = {
  page: StatsPage;
  total: number;
};

type Fixtures = {
  studyPage: (deck: string) => Promise<StudyPage>;
  deckLibraryPage: DeckLibraryPage;
  cleanPage: Page;
  statsPage: (
    deck: string,
    beforeNavigating?: (sp: StudyPage) => Promise<void>,
  ) => Promise<StatsPageReturnType>;
};

export const test = base.extend<Fixtures>({
  studyPage: async ({ page }, use) => {
    await clearStorage(page);
    await use(async (deck: string) => {
      const studyPage = new StudyPage(page);
      await studyPage.goto(deck);
      return studyPage;
    });
    await page.evaluate(() => localStorage.clear());
  },

  deckLibraryPage: async ({ page }, use) => {
    await clearStorage(page);
    const deckLibraryPage = new DeckLibraryPage(page);
    await deckLibraryPage.goto();
    await use(deckLibraryPage);
    await page.evaluate(() => localStorage.clear());
  },

  cleanPage: async ({ page }, use) => {
    await clearStorage(page);
    await use(page);
    await page.evaluate(() => localStorage.clear());
  },
  statsPage: async ({ page }, use) => {
    await clearStorage(page);
    await use(
      async (
        deck: string,
        beforeNavigating?: (sp: StudyPage) => Promise<void>,
      ) => {
        // 1. Go to study page
        const studyPage = new StudyPage(page);
        await studyPage.goto(deck);
        const total = await studyPage.getTotalCards();
        // 2. Click on stats nav button
        if (beforeNavigating) await beforeNavigating(studyPage);
        await page
          .getByRole("link", { name: LABELS.statsPage.statsNavButton })
          .click();
        await page.waitForURL("/stats");
        const statsPage = new StatsPage(page);
        await statsPage.waitForChart();
        return { page: statsPage, total };
      },
    );
    await page.evaluate(() => localStorage.clear());
  },
});

export { expect } from "@playwright/test";
