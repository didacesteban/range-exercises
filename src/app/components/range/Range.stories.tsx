import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Range from "@/app/components/range/Range";

const meta = {
	title: "Range/Range",
	component: Range,
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Continuous: Story = {
	args: {
		min: 1,
		max: 100,
	},
};

export const ContinuousWithDefaults: Story = {
	args: {
		min: 0,
		max: 100,
		defaultMinValue: 20,
		defaultMaxValue: 80,
	},
};

export const DiscreteValues: Story = {
	args: {
		values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
	},
};
