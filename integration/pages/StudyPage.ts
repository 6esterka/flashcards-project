import { type Page, type Locator, expect } from "@playwright/test";
import { LABELS } from "../labels";

const s = LABELS.studyPage;

export class StudyPage {
  readonly filterAll: Locator;
  readonly filterNew: Locator;
  readonly filterLearned: Locator;
  readonly prevButton: Locator;
  readonly nextButton: Locator;
  readonly learnedButton: Locator;
  readonly noCardIndicator: Locator;

  constructor(private readonly page: Page) {
    this.filterAll = page.getByRole("button", {
      name: s.filterAll,
      exact: true,
    });
    this.filterNew = page.getByRole("button", {
      name: s.filterNew,
      exact: true,
    });
    this.filterLearned = page.getByRole("button", {
      name: s.filterLearned,
      exact: true,
    });
    this.prevButton = page.getByRole("button", { name: s.prevButton });
    this.nextButton = page.getByRole("button", { name: s.nextButton });
    this.learnedButton = page.getByRole("button", { name: s.learnedButton });
    this.noCardIndicator = page.getByText(s.noCardIndicator);
  }

  async goto(deck: string) {
    await this.page.goto(`/study/${encodeURIComponent(deck)}`);
    await expect(this.filterAll).toBeVisible();
  }

  async getTotalCards(): Promise<number> {
    const text = await this.page.getByText(s.cardCounterPattern).textContent();
    const match = text?.match(s.cardCounterCapture);
    if (!match)
      throw new Error(`Card counter not found or unparseable: "${text}"`);
    return parseInt(match[1], 10);
  }

  cardCounter(index: number, total: number) {
    return this.page.getByText(s.cardCounter(index, total));
  }

  progressStat(learned: number, total: number) {
    return this.page.getByText(s.progressStat(learned, total));
  }

  async navigateToLastCard() {
    const total = await this.getTotalCards();
    for (let i = 1; i < total; i++) {
      await this.nextButton.click();
      await expect(this.cardCounter(i, total)).toBeVisible();
    }
  }
}
