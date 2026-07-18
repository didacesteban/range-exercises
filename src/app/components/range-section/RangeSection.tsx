import type { IRangeViewModelParams } from "@/app/components/range/IRangeViewModel";
import Range from "@/app/components/range/Range";
import SectionTitle from "@/app/components/section-title/SectionTitle";

type RangeSectionProps = {
	title: string;
	description: string;
} & IRangeViewModelParams;

export default function RangeSection({
	title,
	description,
	...rangeProps
}: RangeSectionProps) {
	return (
		<div className="p-6">
			<SectionTitle title={title} />
			<p className="mt-2 text-sm text-gray-600 leading-relaxed dark:text-gray-400">
				{description}
			</p>
			<div className="mt-8">
				<Range {...rangeProps} />
			</div>
		</div>
	);
}
