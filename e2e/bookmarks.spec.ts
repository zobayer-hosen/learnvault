import { expect, isMobile, mainNav, test } from "./fixtures";

test.describe("bookmarks", () => {
  test("empty state is shown with no saved resources", async ({ page }) => {
    await page.goto("/bookmarks");
    await expect(page.getByRole("heading", { name: "Your vault is empty" })).toBeVisible();
    await page.goto("/");
    await expect(page.getByText("Nothing saved yet.")).toBeVisible();
  });

  test("save from a card, see it everywhere, and remove it", async ({ page }) => {
    await page.goto("/resources/rust-book");
    const related = page.getByRole("button", { name: "Save “MDN JavaScript Guide” to bookmarks" });
    await related.click();
    await expect(page.getByRole("button", { name: "Remove “MDN JavaScript Guide” from bookmarks" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    // Detail-page button
    const full = page.getByRole("button", { name: "Save for later" });
    await full.click();
    await expect(page.getByRole("button", { name: "Saved" })).toHaveAttribute("aria-pressed", "true");

    // Sidebar count
    const nav = await mainNav(page);
    await expect(nav.getByRole("link", { name: /Bookmarks/ })).toContainText("2");
    if (isMobile(page)) await page.keyboard.press("Escape");

    // Dashboard widget, newest first
    await page.goto("/");
    const saved = page.getByRole("region", { name: "Saved for later" });
    await expect(saved.getByRole("link", { name: /The Rust Programming Language/ })).toBeVisible();
    await expect(saved.getByRole("link", { name: /MDN JavaScript Guide/ })).toBeVisible();

    // Bookmarks page, persisted across reload
    await page.goto("/bookmarks");
    await page.reload();
    await expect(page.getByText("2 saved resources")).toBeVisible();
    await page.getByRole("button", { name: "Remove “MDN JavaScript Guide” from bookmarks" }).click();
    await expect(page.getByText("1 saved resource", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Clear all" }).click();
    await expect(page.getByRole("heading", { name: "Your vault is empty" })).toBeVisible();
  });

  test("bookmarks sync across tabs", async ({ page, context }) => {
    await page.goto("/bookmarks");
    const other = await context.newPage();
    await other.goto("/resources/sqlbolt");
    await other.getByRole("button", { name: "Save for later" }).click();
    await expect(page.getByRole("link", { name: "SQLBolt" })).toBeVisible();
    await other.close();
  });

  test("corrupted storage is ignored gracefully", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("learnvault:bookmarks", "{not json"));
    await page.goto("/bookmarks");
    await expect(page.getByRole("heading", { name: "Your vault is empty" })).toBeVisible();
    await page.evaluate(() => localStorage.setItem("learnvault:bookmarks", JSON.stringify({ a: 1 })));
    await page.reload();
    await expect(page.getByRole("heading", { name: "Your vault is empty" })).toBeVisible();
  });
});
