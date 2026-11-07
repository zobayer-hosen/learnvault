import { test as base, expect, type Page } from "@playwright/test";

export const ROUTES = [
  "/",
  "/explore",
  "/categories",
  "/categories/devops-cloud",
  "/resources/rust-book",
  "/learning-paths",
  "/learning-paths/devops-engineering",
  "/bookmarks",
  "/about",
] as const;

/**
 * Fails any test that logs a console error or throws an uncaught page error
 * (this catches hydration mismatches and client-side runtime bugs).
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "console / page errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024;

/** Opens the mobile drawer when needed and returns the visible main navigation. */
export async function mainNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    return page.getByRole("dialog", { name: "Navigation" }).getByRole("navigation", { name: "Main" });
  }
  return page.locator("aside").getByRole("navigation", { name: "Main" });
}
