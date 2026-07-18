import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import FooterLink from "@/app/components/footer-link/FooterLink";

const meta = {
	title: "Range/FooterLink",
	component: FooterLink,
} satisfies Meta<typeof FooterLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		href: "https://github.com/didacesteban/range-exercises",
		children: "GitHub Repository",
	},
};
