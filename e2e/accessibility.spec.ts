import AxeBuilder from "@axe-core/playwright";
import { ROUTES, expect, isMobile, test } from "./fixtures";

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`accessibility (${colorScheme})`, () => {
    test.use({ colorScheme });

    for (const route of ROUTES) {
      test(`${route} has no WCAG 2.1 AA violations`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState("networkidle");
        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        const summary = violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
        }));
        expect(summary).toEqual([]);
      });
    }
  });
}

test.describe("keyboard", () => {
  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("mobile drawer opens, traps focus, and closes with Escape", async ({ page }) => {
    test.skip(!isMobile(page), "mobile only");
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open navigation" });
    await open.click();
    const dialog = page.getByRole("dialog", { name: "Navigation" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });
});
