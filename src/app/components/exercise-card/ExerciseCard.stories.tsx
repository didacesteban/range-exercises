import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ExerciseCard from "@/app/components/exercise-card/ExerciseCard";

const meta = {
	title: "Range/ExerciseCard",
	component: ExerciseCard,
} satisfies Meta<typeof ExerciseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Continuous: Story = {
	args: {
		href: "/exercise/1",
		title: "Exercise 1",
		badge: "Continuous",
		description:
			"A standard numeric range slider handling float/integer limits dynamically loaded from an external source.",
	},
};

export const DiscreteTiers: Story = {
	args: {
		href: "/exercise/2",
		title: "Exercise 2",
		badge: "Discrete Tiers",
		description:
			"A fixed array price-tier slider mapping interactions strictly to custom predefined stepping intervals.",
	},
};
