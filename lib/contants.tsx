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
	Upload,
	Users,
} from "lucide-react";
import mailChamp from "@/assets/mailChamp.png";
import aweber from "@/assets/aweber.png";
import mailerlite from "@/assets/mailerlite.png";
import sendloop from "@/assets/sendloop.png";
import sparkpost from "@/assets/sparkpost.png";
import mailgun from "@/assets/mailgun.png";
import gist from "@/assets/gist.svg";
import hubspot from "@/assets/hubspot.svg";
import suretriggers from "@/assets/suretriggers.png";
import campaign from "@/assets/campaign-monitor.png";
import zapier from "@/assets/zapier.svg";

export const integrationsItems = [
	{
		name: "MailChamp",
		icon: mailChamp,
	},
	{
		name: "Aweber",
		icon: aweber,
	},
	{
		name: "Mailerlite",
		icon: mailerlite,
	},
	{
		name: "Gist",
		icon: gist,
	},
	{
		name: "Sendloop",
		icon: sendloop,
	},
	{
		name: "Sparkpost",
		icon: sparkpost,
	},
	{
		name: "Mailgun",
		icon: mailgun,
	},
	{
		name: "Hubspot",
		icon: hubspot,
	},
	{
		name: "Campaign Monitor",
		icon: campaign,
	},
	{
		name: "Sure Triggers",
		icon: suretriggers,
	},
	{
		name: "Zapier",
		icon: zapier,
	},
	{
		name: "More integrations coming soon",
	},
];
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
		label: "FAQ",
		href: "/faq",
	},

	{
		label: "Docs",
		href: "/docs",
	},
	{
		label: "Integrates",
		href: "/integrates",
	},
	{
		label: "Blog",
		href: "/blog",
	},
	{
		label: "Contact Us",
		href: "/contact-us",
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
		href: "/admin/upload-files-history",
		label: "Upload Files History",
		icon: <Upload />,
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
