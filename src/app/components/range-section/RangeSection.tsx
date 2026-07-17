import type { IRangeViewModelParams } from "@/app/components/range/IRangeViewModel";
import Range from "@/app/components/range/Range";
import SectionTitle from "@/app/components/section-title/SectionTitle";

type RangeSectionProps = { title: string } & IRangeViewModelParams;

export default function RangeSection({
	title,
	...rangeProps
}: RangeSectionProps) {
	return (
		<div className="p-6">
			<SectionTitle title={title} />
			<div className="mt-8">
				<Range {...rangeProps} />
			</div>
		</div>
	);
}
