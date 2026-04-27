import { type Page, type Locator, expect } from "@playwright/test";
import { LABELS } from "../labels";

export class StatsPage {
  readonly totalMastery: Locator;
  readonly chart: Locator;
  constructor(private readonly page: Page) {
    this.totalMastery = page.getByText(LABELS.statsPage.totalMasteryTitle);
    this.chart = page.locator(".recharts-wrapper");
  }
  checkMasteryPercentage(percentage: number) {
    return this.page.getByText(
      LABELS.statsPage.totalMasteryPercentage(percentage),
    );
  }

  async waitForChart() {
    await expect(this.chart).toBeVisible();
  }

  deckBarLabel(deckName: string) {
    return this.page
      .getByRole("application")
      .getByText(deckName, { exact: true });
  }
}
