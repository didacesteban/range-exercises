import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import RangeSection from "@/app/components/range-section/RangeSection";

const meta = {
	title: "Range/RangeSection",
	component: RangeSection,
} satisfies Meta<typeof RangeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Continuous: Story = {
	args: {
		title: "Exercise 1",
		description:
			"A standard numeric range slider handling float/integer limits dynamically loaded from an external source.",
		min: 1,
		max: 100,
	},
};

export const DiscreteValues: Story = {
	args: {
		title: "Exercise 2",
		description:
			"A fixed array price-tier slider mapping interactions strictly to custom predefined stepping intervals.",
		values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
	},
};
