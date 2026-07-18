import { expect, test } from "@playwright/test";

test("visiting an unknown exercise id renders a 404", async ({ page }) => {
	const response = await page.goto("/exercise/3");
	expect(response?.status()).toBe(404);
	await expect(page.getByText(/could not be found/i)).toBeVisible();
});
