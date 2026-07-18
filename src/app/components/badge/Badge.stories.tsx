import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Badge from "@/app/components/badge/Badge";

const meta = {
	title: "Range/Badge",
	component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Continuous: Story = {
	args: {
		children: "Continuous",
	},
};

export const DiscreteTiers: Story = {
	args: {
		children: "Discrete Tiers",
	},
};
