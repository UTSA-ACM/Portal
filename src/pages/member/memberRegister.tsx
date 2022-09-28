import { FunctionComponent } from "react";
import public_config from "../../../config/public_config.json";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

// const Home: NextPage = () => {
//   const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

const NewEventView: FunctionComponent = () => {
	const orgs = public_config.organizations;
	const orgSelects = [];
	for (let org of orgs) {
		console.log(org);
		orgSelects.push(
			<option key={org} value={org}>
				{org}
			</option>
		);
	}

	let r = trpc.useMutation(["admin.createEvent"]);

	const { register, handleSubmit } = useForm();
	const didSubmit = async (p: any) => {
		let data = p;

		const ret = r.mutate({
			eventName: data.eventName,
			eventDescription: data.eventDescription,
			eventImage: data.eventImage,
			eventOrg: data.eventOrg,
			eventStart: new Date(data.eventStart),
			eventEnd: new Date(data.eventEnd),
			formOpen: new Date(data.formOpen),
			formClose: new Date(data.formClose),
		});
		console.log(ret);
	};

	return (
		<div className="w-full h-full p-[5px]">
			<form
				onSubmit={handleSubmit(didSubmit)}
				className="w-full flex flex-col mx-auto max-w-[800px]"
			>
				<label className="font-opensans">First Name</label>
				<input
					id="fullName"
					type="text"
					placeholder="Full Name"
					className="bg-slate-200 border-none h-[50px] w-[75%] focus:outline-none p-[5px] rounded-md my-[10px]"
					{...register("fullName", { required: true })}
				/>
                <Link href="../admin">
                    <button className="bg-primary-lighter text-white h-[50px] w-[150px] rounded-xl font-bold flex items-center justify-center">
                        Next <BsFillArrowRightCircleFill className="ml-[5px]" />
                    </button>
                </Link>
			</form>
		</div>
	);
};

export default NewEventView;
