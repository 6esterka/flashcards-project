import { type Page, type Locator, expect } from "@playwright/test";
import { LABELS } from "../labels";

export class DeckLibraryPage {
  readonly title: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByRole("heading", { name: LABELS.deckLibrary.title });
  }

  async goto() {
    await this.page.goto("/");
  }

  firstDeck() {
    return this.page
      .getByRole("button")
      .filter({ has: this.page.getByRole("heading", { level: 2 }) })
      .first();
  }

  async selectFirstDeck(): Promise<string> {
    const deck = this.firstDeck();
    await expect(deck).toBeVisible();
    const deckName = (
      await deck.getByRole("heading", { level: 2 }).textContent()
    )?.trim();
    if (!deckName) throw new Error("Could not read deck name from heading");
    await deck.click();
    return deckName;
  }

  async waitForStudyPage() {
    await expect(
      this.page.getByText(LABELS.studyPage.cardCounterPattern),
    ).toBeVisible();
  }
}
