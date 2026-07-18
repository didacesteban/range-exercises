import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: "todo",
		},
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: "",
				dark: "dark",
			},
			defaultTheme: "light",
			parentSelector: "html",
		}),
		(Story) => (
			<div className="min-h-screen bg-white p-6 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
				<Story />
			</div>
		),
	],
};

export default preview;
