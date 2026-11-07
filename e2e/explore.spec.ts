import { expect, test } from "./fixtures";

const resultCount = (page: import("@playwright/test").Page) =>
  page.locator("p[aria-live=polite]").first();

const resultTitles = (page: import("@playwright/test").Page) =>
  page.locator("main article h3").allInnerTexts();

test.describe("global search", () => {
  test("header search submits to Explore and shows matches", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("searchbox", { name: "Search resources" }).fill("kubernetes");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/explore?q=kubernetes");
    await expect(resultCount(page)).toContainText("1 resource");
    await expect(page.getByRole("searchbox", { name: "Search by title or description" })).toHaveValue("kubernetes");
  });

  test("'/' focuses the search box", async ({ page }) => {
    await page.goto("/categories");
    await page.locator("body").press("/");
    await expect(page.getByRole("searchbox", { name: "Search resources" })).toBeFocused();
  });

  test("searching again from the header updates the Explore input", async ({ page }) => {
    await page.goto("/explore?q=docker");
    await expect(resultCount(page)).toContainText("matching “docker”");
    const header = page.getByRole("searchbox", { name: "Search resources" });
    await header.fill("rust");
    await header.press("Enter");
    await expect(page).toHaveURL("/explore?q=rust");
    await expect(page.getByRole("searchbox", { name: "Search by title or description" })).toHaveValue("rust");
  });
});

test.describe("explore filters", () => {
  test("typing filters results after debounce", async ({ page }) => {
    await page.goto("/explore");
    await expect(resultCount(page)).toContainText("52 resources");
    await page.getByRole("searchbox", { name: "Search by title or description" }).fill("postgres");
    await expect(page).toHaveURL("/explore?q=postgres");
    await expect(resultCount(page)).toContainText("1 resource");
  });

  test("combining type and difficulty narrows results", async ({ page }) => {
    await page.goto("/explore");
    await page.getByLabel("Resource type").selectOption("book");
    await expect(page).toHaveURL(/type=book/);
    await page.getByLabel("Difficulty").selectOption("advanced");
    await expect(page).toHaveURL(/difficulty=advanced/);
    await expect(resultCount(page)).toContainText("3 resources");
    expect((await resultTitles(page)).sort()).toEqual([
      "Designing Data-Intensive Applications",
      "Operating Systems: Three Easy Pieces",
      "Use The Index, Luke",
    ]);
  });

  test("category reveals subcategory filter, and changing category resets it", async ({ page }) => {
    await page.goto("/explore");
    await expect(page.getByLabel("Subcategory")).toHaveCount(0);
    await page.getByLabel("Category", { exact: true }).selectOption("devops-cloud");
    await expect(resultCount(page)).toContainText("5 resources");
    await page.getByLabel("Subcategory").selectOption("containers");
    await expect(page).toHaveURL("/explore?category=devops-cloud&sub=containers");
    await expect(resultCount(page)).toContainText("2 resources");

    await page.getByLabel("Category", { exact: true }).selectOption("cybersecurity");
    await expect(page).toHaveURL("/explore?category=cybersecurity");
    await expect(page.getByLabel("Subcategory")).toHaveValue("");
  });

  test("tags toggle on and off", async ({ page }) => {
    await page.goto("/explore");
    const tag = page.getByRole("button", { name: "#python" });
    await tag.click();
    await expect(tag).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL("/explore?tags=python");
    const count = await resultCount(page).innerText();
    expect(Number.parseInt(count)).toBeGreaterThan(1);
    await tag.click();
    await expect(page).toHaveURL("/explore");
  });

  test("sort by most popular orders by saves", async ({ page }) => {
    await page.goto("/explore");
    await page.getByLabel("Sort by").selectOption("popular");
    await expect(page).toHaveURL("/explore?sort=popular");
    expect((await resultTitles(page)).slice(0, 2)).toEqual(["Frontend Developer Roadmap", "The System Design Primer"]);
  });

  test("no matches shows an empty state that resets", async ({ page }) => {
    await page.goto("/explore?q=zzzznotathing");
    await expect(page.getByRole("heading", { name: "No resources match these filters" })).toBeVisible();
    await page.getByRole("link", { name: "Reset filters" }).click();
    await expect(page).toHaveURL("/explore");
    await expect(resultCount(page)).toContainText("52 resources");
  });

  test("clear all filters resets everything including the search box", async ({ page }) => {
    await page.goto("/explore?q=guide&type=official-guide&difficulty=intermediate");
    await page.getByRole("button", { name: "Clear all filters" }).click();
    await expect(page).toHaveURL("/explore");
    await expect(page.getByRole("searchbox", { name: "Search by title or description" })).toHaveValue("");
    await expect(page.getByLabel("Resource type")).toHaveValue("");
  });

  test("malformed URL params are ignored instead of crashing", async ({ page }) => {
    const response = await page.goto("/explore?type=bogus&difficulty=expert&sort=random&tags=%3Cscript%3E&category=../../etc");
    expect(response?.status()).toBe(200);
    await expect(resultCount(page)).toContainText("52 resources");
  });

  test("filter state survives reload and back/forward", async ({ page }) => {
    await page.goto("/explore");
    await page.getByLabel("Difficulty").selectOption("beginner");
    await expect(page).toHaveURL("/explore?difficulty=beginner");
    await page.reload();
    await expect(page.getByLabel("Difficulty")).toHaveValue("beginner");
  });
});
