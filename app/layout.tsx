import GoogleAnalytics from "@/components/GoogleAnalysis";
import TawkToChat from "@/components/TalkToChat";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Figtree, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	weight: "variable",
	variable: "--font-mont",
});
const Grotesk = Figtree({
	display: "swap",
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	applicationName: "PureChecker",
	title: {
		template: `PureChecker: %s`,
		default: "Best Bulk Email Checker With Highest Accuracy",
	},
	description:
		"Pure Checker is the best email validation tool, providing top accuracy and a powerful API at an affordable price. Clean your email list, boost deliverability, and enhance marketing success with our fast and reliable service.",
	keywords: [
		"PureChecker",
		"email verification",
		"bulk email checker",
		"email validator",
		"verify emails online",
		"email cleaning tool",
		"validate email addresses",
	],
	metadataBase: new URL("https://purechecker.com"),
	icons: {
		icon: "/logo.png",
		shortcut: "/favicon.ico", // Commonly used for browser tabs
	},
	openGraph: {
		title: "PureChecker - Best Email Verification Tool",
		description:
			"Verify emails in bulk or individually with high accuracy and efficiency. Start with 100 free credits.",
		url: "https://purechecker.com", // Your website's URL
		siteName: "PureChecker",
		images: [
			{
				url: "/logo.png",
				width: 800,
				height: 600,
				alt: "PureChecker Logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "PureChecker - Best Email Verification Tool",
		description:
			"Start verifying emails with the best email verification tool. Enjoy high accuracy and efficiency!",
		images: ["/logo.png"], // Twitter image preview
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "PureChecker",
		url: "https://purechecker.com",
		potentialAction: {
			"@type": "SearchAction",
			target: "https://purechecker.com/search?q={search_term_string}",
			"query-input": "required name=search_term_string",
		},
		hasPart: [
			{
				"@type": "WebPage",
				"@id": "https://purechecker.com/",
				name: "Free Email Checker",
				description:
					"Check your email validity instantly with PureChecker's free email checker tool.",
			},
			{
				"@type": "WebPage",
				"@id": "https://purechecker.com/docs",
				name: "API Integration",
				description:
					"Integrate PureChecker's powerful email validation API into your application.",
			},
			{
				"@type": "WebPage",
				"@id": "https://purechecker.com/pricing",
				name: "Pricing",
				description:
					"Explore affordable pricing plans for PureChecker's email validation services.",
			},
			{
				"@type": "WebPage",
				"@id": "https://purechecker.com/contact-us",
				name: "Contact Us",
				description:
					"Get in touch with the PureChecker team for any inquiries or support.",
			},
		],
	};

	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<Script src='https://cdn.paddle.com/paddle/v2/paddle.js'></Script>
				<Script
					type='application/ld+json'
					id='structured-data'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
				<meta name='msvalidate.01' content='819F838DC2F377A719BC54DA7C97D6D0' />
			</head>
			<body
				className={`${Grotesk.className} ${montserrat.variable} antialiased font-medium bg-white dark:bg-background`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem
					disableTransitionOnChange
				>
					<TawkToChat />
					<GoogleAnalytics />
					{process.env.NEXT_PUBLIC_APP_MAINTENANCE === "off" && children}
					{process.env.NEXT_PUBLIC_APP_MAINTENANCE === "on" && (
						<div className='flex flex-col justify-center items-center'>
							<br /> <br />
							<h1 className=' text-2xl md:text-3xl text-center font-bold'>
								Web Under Maintenance 😥
							</h1>
						</div>
					)}

					<Toaster position='top-center' />
				</ThemeProvider>
			</body>
		</html>
	);
}
