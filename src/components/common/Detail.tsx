import { FunctionComponent } from "react";
import { classNames } from "@/utils/helpers";

export interface DetailProps {
	label: string;
	children: string | number | JSX.Element;
	useButton?: boolean;
	buttonLabel?: string;
	buttonAction?: () => any;
	striped?: boolean;
}

const Detail: FunctionComponent<DetailProps> = ({
	children,
	label,
	useButton,
	striped,
	buttonLabel,
	buttonAction,
}: DetailProps) => {
	useButton = useButton ?? false;
	striped = striped ?? true;
	return (
		<div
			className={classNames(
				striped ? "even:bg-gray-50" : null,
				"bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:px-6 sm:gap-4"
			)}
		>
			<dt className="text-sm font-medium text-gray-500">{label}</dt>
			<dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
				<span className="flex-grow">{children}</span>
				{useButton ? (
					<span className="ml-4 flex-shrink-0">
						<button
							onClick={buttonAction}
							type="button"
							className="bg-white rounded-md font-semibold text-secondary-500 hover:text-secondary-600 focus:outline-none focus:ring-[1.5px] focus:ring-offset-4 focus:ring-blue-500"
						>
							{buttonLabel ?? "Modify"}
						</button>
					</span>
				) : null}
			</dd>
		</div>
	);
};

export default Detail;
