import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: {
    template: `PureChecker: %s`,
    default: 'PureChecker'
  },
  description: "Best app for email verify",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.paddle.com/paddle/v2/paddle.js"></Script>
      </head>
      <body
        className={`${montserrat.className} antialiased font-medium bg-blue-50 dark:bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {children}
          <Toaster />
        </ThemeProvider>
      </body>

    </html>
  );
}
