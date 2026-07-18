import ExerciseCard from "@/app/components/exercise-card/ExerciseCard";
import FooterLink from "@/app/components/footer-link/FooterLink";

export default function HomePage() {
	return (
		<main className="font-sans text-gray-800 antialiased dark:text-gray-100">
			<header className="flex justify-center border-b border-gray-200 pb-8 mb-8 dark:border-gray-800">
				<p className="text-lg text-gray-600 max-w-2xl text-center dark:text-gray-400">
					A production-ready implementation of a dual-handle range slider, built
					to demonstrate modern frontend architecture, robust toolchains, and
					strict testability.
				</p>
			</header>

			<section className="mb-12">
				<h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 dark:text-gray-500">
					Explore the Exercises
				</h2>
				<div className="grid sm:grid-cols-2 gap-4">
					<ExerciseCard
						href="/exercise/1"
						title="Exercise 1"
						badge="Continuous"
						description="A standard numeric range slider handling float/integer limits dynamically loaded from an external source."
					/>
					<ExerciseCard
						href="/exercise/2"
						title="Exercise 2"
						badge="Discrete Tiers"
						description="A fixed array price-tier slider mapping interactions strictly to custom predefined stepping intervals."
					/>
				</div>
			</section>

			<section className="grid md:grid-cols-2 gap-8 text-sm border-t border-gray-100 pt-8 dark:border-gray-800">
				<div>
					<h3 className="font-semibold text-gray-900 mb-2 dark:text-white">
						Clean Architecture & MVVM
					</h3>
					<p className="text-gray-600 leading-relaxed dark:text-gray-400">
						The <strong>UI</strong> is deliberately <strong>decoupled</strong>{" "}
						from its business rules. By using a strict
						<strong>
							<code> IRangeViewModel </code>
						</strong>
						contract, all dragging math, keyboard accessibility, and validations
						are fully abstracted and standalone-testable outside of React. Data
						fetching is likewise isolated in its own service layer, with
						colocated <strong>unit tests </strong>
						validating each piece of logic independently.
					</p>
				</div>

				<div>
					<h3 className="font-semibold text-gray-900 mb-2 dark:text-white">
						Modern Tooling Stack
					</h3>
					<p className="text-gray-600 leading-relaxed dark:text-gray-400">
						Configured manually from scratch using{" "}
						<strong>Next.js (App Router)</strong> and{" "}
						<strong>TypeScript</strong>. Powered by <strong>Biome</strong> for
						lightning-fast linting/formatting, <strong>Vitest</strong> for
						co-located unit tests, and <strong>Playwright</strong> for
						end-to-end integration flows. <strong>Lefthook</strong> git hooks
						run linting, type-checking, and unit tests on every commit, and the
						full e2e suite before every push. Every component is also documented
						in isolation with <strong>Storybook</strong>.
					</p>
				</div>
			</section>

			<footer className="mt-16 pt-6 border-t border-gray-200 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
				<span>
					Developed by{" "}
					<FooterLink href="https://www.linkedin.com/in/didac-esteban-10033b67/">
						Dídac Esteban
					</FooterLink>
				</span>
				<FooterLink href="https://github.com/didacesteban/range-exercises">
					GitHub Repository
				</FooterLink>
				<FooterLink href="https://range-storybook.vercel.app/?path=/story/range-range--continuous">
					Storybook Documentation
				</FooterLink>
			</footer>
		</main>
	);
}
