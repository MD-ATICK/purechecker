import {
	BadgePlus,
	Cable,
	CircleDollarSign,
	Cog,
	Coins,
	FileClock,
	LayoutGrid,
	Mails,
	PackageCheck,
	PenTool,
	Pickaxe,
	Users,
} from "lucide-react";

// hello

export const navRoutes = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Pricing",
		href: "/pricing",
	},
	{
		label: "Contact Us",
		href: "/contact-us",
	},
	{
		label: "Docs",
		href: "/docs",
	},
	{
		label: "Blog",
		href: "/blog",
	},
	{
		label: "FAQ",
		href: "/faq",
	},
];

export const adminDashboardRoutes = [
	{
		href: "/admin/dashboard",
		label: "Dashboard",
		icon: <LayoutGrid />,
	},
	{
		href: "/admin/users",
		label: "Users",
		icon: <Users />,
	},
	{
		href: "/admin/orders",
		label: "Orders",
		icon: <PackageCheck />,
	},
	{
		href: "/admin/anonymous-users",
		label: "Anonymous Users",
		icon: <BadgePlus />,
	},
	{
		href: "/admin/credit-history",
		label: "Credit History",
		icon: <Coins />,
	},
	{
		href: "/admin/jobs",
		label: "Jobs",
		icon: <Pickaxe />,
	},
	{
		href: "/admin/blogs",
		label: "Blogs",
		icon: <PenTool />,
	},
	{
		href: "/admin/pricing",
		label: "Pricing",
		icon: <CircleDollarSign />,
	},
	{
		href: "/admin/apis",
		label: "Apis",
		icon: <Cable />,
	},
	{
		href: "/admin/settings",
		label: "Settings",
		icon: <Cog />,
	},
];
export const userDashboardRoutes = [
	{
		href: "/user/dashboard",
		label: "Dashboard",
		icon: <LayoutGrid />,
	},
	{
		href: "/user/verify-emails",
		label: "Verify Emails",
		icon: <Mails />,
	},
	{
		href: "/user/orders",
		label: "Orders",
		icon: <PackageCheck />,
	},
	{
		href: "/user/credit-history",
		label: "Credit History",
		icon: <FileClock />,
	},
	{
		href: "/user/pricing",
		label: "Pricing",
		icon: <CircleDollarSign />,
	},
	{
		href: "/user/api",
		label: "Api",
		icon: <Cable />,
	},
	{
		href: "/user/settings",
		label: "Settings",
		icon: <Cog />,
	},
];

export const acceptedTypes = [
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
	"application/vnd.ms-excel", // .xls
	"text/csv", // .csv
];
