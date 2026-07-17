import { expect, type Page, test } from "@playwright/test";

async function dragHandleTo(page: Page, handleTestId: string, ratio: number) {
	const track = page.getByTestId("range-track");
	const handle = page.getByTestId(handleTestId);
	const trackBox = await track.boundingBox();
	const handleBox = await handle.boundingBox();
	if (!trackBox || !handleBox) throw new Error("Missing bounding box");

	const targetX = trackBox.x + trackBox.width * ratio;
	const targetY = handleBox.y + handleBox.height / 2;

	await handle.hover();
	await page.mouse.down();
	await page.mouse.move(targetX, targetY, { steps: 10 });
	await page.mouse.up();
}

test.describe("Range - continuous mode (exercise 1, 1-100)", () => {
	test("dragging the min handle updates its value and label", async ({
		page,
	}) => {
		await page.goto("/exercise/1");
		await dragHandleTo(page, "range-handle-min", 49 / 99); // -> value 50
		await expect(page.getByTestId("range-label-min")).toContainText(
			/50,00\s*€/,
		);
	});

	test("the min handle cannot be dragged past the max handle", async ({
		page,
	}) => {
		await page.goto("/exercise/1");
		await dragHandleTo(page, "range-handle-max", 39 / 99); // -> value 40
		await expect(page.getByTestId("range-label-max")).toContainText(
			/40,00\s*€/,
		);

		await dragHandleTo(page, "range-handle-min", 1); // attempt to drag to value 100
		await expect(page.getByTestId("range-label-min")).toContainText(
			/40,00\s*€/,
		);
	});

	test("clicking the min label allows typing a new value", async ({ page }) => {
		await page.goto("/exercise/1");
		await page.getByTestId("range-label-min").click();
		const input = page.getByTestId("range-input-min");
		await expect(input).toBeFocused();
		await input.fill("75");
		await input.press("Enter");
		await expect(page.getByTestId("range-label-min")).toContainText(
			/75,00\s*€/,
		);
	});

	test("a handle shows a grab cursor and enlarges on hover", async ({
		page,
	}) => {
		await page.goto("/exercise/1");
		const handle = page.getByTestId("range-handle-min");
		await expect(handle).toHaveCSS("cursor", "grab");
		await expect(handle).toHaveCSS("scale", "none");
		await handle.hover();
		await expect(handle).toHaveCSS("scale", "1.5");
	});

	test("dragging a handle sets a grabbing cursor for the whole page", async ({
		page,
	}) => {
		await page.goto("/exercise/1");
		const handle = page.getByTestId("range-handle-min");
		const box = await handle.boundingBox();
		if (!box) throw new Error("Missing handle box");

		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
		await page.mouse.down();
		await page.mouse.move(box.x + 50, box.y + box.height / 2);
		await expect(page.locator("body")).toHaveCSS("cursor", "grabbing");

		await page.mouse.up();
		await expect(page.locator("body")).not.toHaveCSS("cursor", "grabbing");
	});
});

test.describe("Range - discrete mode (exercise 2, price tiers)", () => {
	test("dragging snaps to the nearest provided value", async ({ page }) => {
		await page.goto("/exercise/2");
		// Between index 1 (5.99 @ 20%) and index 2 (10.99 @ 40%), closer to index 2.
		await dragHandleTo(page, "range-handle-min", 0.35);
		await expect(page.getByTestId("range-label-min")).toContainText(
			/10,99\s*€/,
		);
	});

	test("typing an arbitrary value snaps to the closest option", async ({
		page,
	}) => {
		await page.goto("/exercise/2");
		await page.getByTestId("range-label-max").click();
		const input = page.getByTestId("range-input-max");
		await input.fill("45");
		await input.press("Enter");
		// 45 is closer to 50.99 (diff 5.99) than to 30.99 (diff 14.01).
		await expect(page.getByTestId("range-label-max")).toContainText(
			/50,99\s*€/,
		);
	});

	test("handles cannot cross and only land on provided values", async ({
		page,
	}) => {
		await page.goto("/exercise/2");
		await dragHandleTo(page, "range-handle-max", 0.05);
		// Max cannot go below the min handle (index 0 = 1.99), so it clamps there.
		await expect(page.getByTestId("range-label-max")).toContainText(/1,99\s*€/);
	});
});
