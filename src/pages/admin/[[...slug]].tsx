import type { NextPage } from "next";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsCalendarRange } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import EventView from "@/components/admin/EventView";
import MemberView from "@/components/admin/MemberView";
import DashView from "@/components/admin/DashView";
import NewEventView from "@/components/admin/NewEventView";
import NewMemberView from "@/components/admin/NewMemberView";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import EditEventView from "@/components/admin/EditEventView";
import EditMemberView from "@/components/admin/EditMemberView";

enum AdminView {
	dashboard,
	members,
	events,
	newEvent,
	newMember,
	editEvent,
	editMember,
}

const sideNavElements = [
	{
		icon: AiOutlineDashboard,
		page: AdminView.dashboard,
		text: "Dashboard",
	},
	{
		icon: CgProfile,
		page: AdminView.members,
		text: "Members",
	},
	{
		icon: BsCalendarRange,
		page: AdminView.events,
		text: "Events",
	},
];

const inferFromPath = (path: string): [FunctionComponent | null, AdminView | null] => {
	if (path.startsWith("/admin/events/")) {
		if (path.endsWith("/new/")) return [NewEventView, AdminView.newEvent];
		if (path.endsWith("/admin/events/")) return [EventView, AdminView.events];
		return [EditEventView, AdminView.editEvent];
	}
	if (path.startsWith("/admin/members/")) {
		if (path.endsWith("/new/")) return [NewMemberView, AdminView.newMember];
		if (path.endsWith("/admin/members/")) return [MemberView, AdminView.members];
		return [EditMemberView, AdminView.editMember];
	}
	if (path.endsWith("/admin/")) return [DashView, AdminView.dashboard];

	return [null, null];
};

const Admin: NextPage = () => {
	const router = useRouter();
	let path =
		router.asPath.charAt(router.asPath.length - 1) != "/" ? router.asPath + "/" : router.asPath;

	const swapPage = (view: AdminView) => {
		CurrentPage = view;
		switch (view) {
			case AdminView.dashboard:
				router.push("/admin/", undefined, { shallow: true });
				break;
			case AdminView.members:
				router.push("/admin/members/", undefined, { shallow: true });
				break;
			case AdminView.events:
				router.push("/admin/events/", undefined, { shallow: true });
				break;
			case AdminView.newEvent:
				router.push("/admin/events/new/", undefined, { shallow: true });
				break;
			case AdminView.newMember:
				router.push("/admin/members/new/", undefined, { shallow: true });
				break;
		}
	};

	let [ElementToShow, CurrentPage] = inferFromPath(path);

	return (
		<div className="page-view bg-white flex flex-col md:flex-row w-[100vw]">
			<div className="w-full md:min-w-[13rem] lg:min-w-[13.5rem] md:max-w-[14rem] [&>*]:cursor-pointer py-2 md:py-6 border-r-zinc-200 border-2 font-inter text-left text-lg font-semibold">
				{sideNavElements.map((element) => (
					<div
						key={element.text}
						className={`w-52 mx-auto lg:w-full py-1.5 md:py-4 px-2 grid grid-cols-3 v ${
							element.page === CurrentPage ? "text-zinc-900" : "text-zinc-600"
						} hover:text-zinc-900`}
						onClick={() => swapPage(element.page)}
					>
						<div className="col-span-1 m-auto">
							<element.icon />
						</div>
						<div className="col-span-2 justify-self-start">
							<span>{element.text}</span>
						</div>
					</div>
				))}
			</div>
			<div className="p-5 pt-[1rem] h-full w-full bg-zinc-100">
				<div className="col-span-4">{ElementToShow ? <ElementToShow /> : null}</div>
			</div>
		</div>
	);
};

export default Admin;
