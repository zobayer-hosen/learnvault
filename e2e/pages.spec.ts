import { ROUTES, expect, isMobile, mainNav, test } from "./fixtures";

test.describe("every page", () => {
  for (const route of ROUTES) {
    test(`${route} renders without errors or horizontal overflow`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);
    });
  }

  test("each page has a unique, descriptive title", async ({ page }) => {
    const titles = new Set<string>();
    for (const route of ROUTES) {
      await page.goto(route);
      const title = await page.title();
      expect(title).toContain("LearnVault");
      titles.add(title);
    }
    expect(titles.size).toBe(ROUTES.length);
  });
});

test.describe("navigation", () => {
  test("sidebar links navigate and mark the current page", async ({ page }) => {
    await page.goto("/");
    for (const [label, path, heading] of [
      ["Explore", "/explore", "Explore resources"],
      ["Categories", "/categories", "Categories"],
      ["Learning Paths", "/learning-paths", "Learning paths"],
      ["Bookmarks", "/bookmarks", "Bookmarks"],
      ["About", "/about", "About LearnVault"],
      ["Dashboard", "/", "Your Knowledge, One Place."],
    ] as const) {
      const nav = await mainNav(page);
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      if (isMobile(page)) await expect(page.getByRole("dialog", { name: "Navigation" })).toBeHidden();
      await expect((await mainNav(page)).getByRole("link", { name: label, exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
      if (isMobile(page)) await page.keyboard.press("Escape");
    }
  });

  test("category → resource → learning path drill-down", async ({ page }) => {
    await page.goto("/categories");
    await page.getByRole("link", { name: /DevOps & Cloud/ }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("DevOps & Cloud");
    await expect(page.getByRole("heading", { name: "Containers", level: 2 })).toBeVisible();

    await page.getByRole("link", { name: "Docker — Get Started" }).click();
    await expect(page).toHaveURL("/resources/docker-get-started");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Docker — Get Started");

    await page.getByRole("link", { name: "DevOps Engineering" }).click();
    await expect(page).toHaveURL("/learning-paths/devops-engineering");
    await expect(page.getByRole("list", { name: "Path steps" }).locator(":scope > li")).toHaveCount(5);
  });

  test("breadcrumbs lead back up the hierarchy", async ({ page }) => {
    await page.goto("/resources/rust-book");
    await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Programming Languages" }).click();
    await expect(page).toHaveURL("/categories/programming-languages");
  });

  test("unknown slugs show the not-found page", async ({ page, consoleErrors }) => {
    for (const route of ["/resources/does-not-exist", "/categories/nope", "/learning-paths/nope", "/random"]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { name: "We couldn’t find that page" })).toBeVisible();
    }
    // A 404 document request is logged by the browser; that is expected here.
    consoleErrors.splice(0, consoleErrors.length, ...consoleErrors.filter((e) => !/404/.test(e)));
  });
});

test.describe("resource details", () => {
  test("external link opens the real source safely in a new tab", async ({ page }) => {
    await page.goto("/resources/rust-book");
    const link = page.getByRole("link", { name: /Open resource/ });
    await expect(link).toHaveAttribute("href", "https://doc.rust-lang.org/book/");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  });

  test("tag links filter Explore by that tag", async ({ page }) => {
    await page.goto("/resources/rust-book");
    await page.getByRole("link", { name: "#rust" }).click();
    await expect(page).toHaveURL("/explore?tags=rust");
    await expect(page.getByRole("button", { name: "#rust" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("1 resource", { exact: true })).toBeVisible();
  });
});
