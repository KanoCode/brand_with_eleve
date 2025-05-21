import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import AppProviders from "@/components/shared/appProviders";
import { cn } from "@/lib/utils";
import { NavigationEvents } from "@/components/shared/NavigationEvents";
import { Suspense } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Market Hub",
  description: "shop listing branded and unbranded products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`,`}
          type="module"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VX454WXPQD"
        ></script>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />

        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        gtag('js', new Date());
        gtag('config', 'G-VX454WXPQD')
        `}
        </Script>
      </head>
      <body
        className={cn("bg-background font-sans antialiased", roboto.variable)}
      >
        <AppProviders>{children}</AppProviders>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
