import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { usePathname } from "@storybook/nextjs-vite/navigation.mock";

import MenuLink from "@/app/components/menu-link/MenuLink";

const meta = {
	title: "Range/MenuLink",
	component: MenuLink,
} satisfies Meta<typeof MenuLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
	args: {
		href: "/exercise/1",
		title: "Exercise 1",
	},
	beforeEach: async () => {
		usePathname.mockReturnValue("/exercise/1");
	},
};

export const Inactive: Story = {
	args: {
		href: "/exercise/2",
		title: "Exercise 2",
	},
	beforeEach: async () => {
		usePathname.mockReturnValue("/exercise/1");
	},
};
