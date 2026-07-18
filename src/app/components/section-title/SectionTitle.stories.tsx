import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SectionTitle from "@/app/components/section-title/SectionTitle";

const meta = {
	title: "Range/SectionTitle",
	component: SectionTitle,
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Exercise 1",
	},
};
