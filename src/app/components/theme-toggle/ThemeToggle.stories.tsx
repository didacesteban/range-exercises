import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ThemeToggle from "@/app/components/theme-toggle/ThemeToggle";

const meta = {
	title: "Range/ThemeToggle",
	component: ThemeToggle,
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
