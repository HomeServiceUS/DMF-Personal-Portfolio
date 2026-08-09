// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Brain mini-site smoke", () => {
  test("inject → promote records an unlock", async ({ page }) => {
    await page.goto("/demos/brain/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Capture in/i);
    await expect(page.locator("#cy")).toBeVisible();
    await expect(page.locator("#tPromoted")).toHaveText("0");

    const inject = page.locator('[data-channel="agent"] button', {
      hasText: "INJECT NEXT",
    });
    await expect(inject).toBeEnabled();
    await inject.click();

    const promote = page.getByRole("button", { name: "PROMOTE" });
    await expect(promote).toBeVisible({ timeout: 8_000 });
    await promote.click();

    await expect(page.locator("#tPromoted")).not.toHaveText("0", { timeout: 8_000 });
    await expect(page.locator("#unlockList .row").first()).toBeVisible({ timeout: 8_000 });
    await expect(page.locator("#tUnlocks")).not.toHaveText("0");
  });

  test("play full flow advances telemetry", async ({ page }) => {
    await page.goto("/demos/brain/");
    await page.getByRole("button", { name: "PLAY FULL FLOW" }).click();
    await expect(page.locator("#tPromoted")).not.toHaveText("0", { timeout: 45_000 });
  });
});
