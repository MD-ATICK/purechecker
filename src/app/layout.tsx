import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({ subsets: ['latin'] })


export const metadata: Metadata = {
  applicationName: 'PureChecker',
  title: {
    template: `PureChecker: %s`,
    default: 'PureChecker - Best Email Verification Tool',
  },
  description: 'PureChecker is the best app for email verification. Verify emails in bulk or individually with high accuracy and efficiency.',
  keywords: [
    'PureChecker',
    'email verification',
    'bulk email checker',
    'email validator',
    'verify emails online',
    'email cleaning tool',
    'validate email addresses',
  ],
  icons: {
    icon: '/logo.png',
    shortcut: '/favicon.ico', // Commonly used for browser tabs
  },
  openGraph: {
    title: 'PureChecker - Best Email Verification Tool',
    description: 'Verify emails in bulk or individually with high accuracy and efficiency. Start with 100 free credits.',
    url: 'https://purechecker.com', // Your website's URL
    siteName: 'PureChecker',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'PureChecker Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PureChecker - Best Email Verification Tool',
    description: 'Start verifying emails with the best email verification tool. Enjoy high accuracy and efficiency!',
    images: ['/logo.png'], // Twitter image preview
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


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://cdn.paddle.com/paddle/v2/paddle.js"></Script>
      </head>
      <body
        className={`${montserrat.className} antialiased font-medium bg-blue-50 dark:bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {
            process.env.NEXT_PUBLIC_APP_MAINTENANCE === "off" &&
            children
          }
          {
            process.env.NEXT_PUBLIC_APP_MAINTENANCE === "on" &&
            <div className="flex flex-col justify-center items-center">
              <br /> <br />
              <h1 className=" text-2xl md:text-3xl text-center font-bold">Web Under Maintenance 😥</h1>
            </div>
          }

          <Toaster />
        </ThemeProvider>
      </body>

    </html>
  );
}
