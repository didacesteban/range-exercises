import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const pathnameMock = vi.fn();

vi.mock("next/navigation", () => ({
	usePathname: () => pathnameMock(),
}));

import MenuLink from "@/app/components/menu-link/MenuLink";

afterEach(() => {
	cleanup();
});

describe("MenuLink", () => {
	it("shows a solid border when its href matches the current path", () => {
		pathnameMock.mockReturnValue("/exercise/1");
		render(<MenuLink href="/exercise/1" title="Exercise 1" />);
		expect(
			screen.getByRole("link", { name: "Exercise 1" }).className,
		).toContain("border-gray-800");
	});

	it("keeps a transparent border when its href doesn't match the current path", () => {
		pathnameMock.mockReturnValue("/exercise/1");
		render(<MenuLink href="/exercise/2" title="Exercise 2" />);
		expect(
			screen.getByRole("link", { name: "Exercise 2" }).className,
		).toContain("border-transparent");
	});

	it("calls onClick when clicked", () => {
		pathnameMock.mockReturnValue("/exercise/1");
		const onClick = vi.fn();
		render(
			<MenuLink href="/exercise/2" title="Exercise 2" onClick={onClick} />,
		);
		fireEvent.click(screen.getByRole("link", { name: "Exercise 2" }));
		expect(onClick).toHaveBeenCalledOnce();
	});
});
