
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import { Providers } from "./providers";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { defaultDescription, siteName, siteUrl } from "../lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "MentorLagbe | Find Your Perfect Tutor",
    template: "%s | MentorLagbe",
  },
  description: defaultDescription,
  keywords: [
    "MentorLagbe",
    "tuition finder Bangladesh",
    "find tutors",
    "home tuition",
    "online tuition",
    "private tutors",
    "student tutor platform",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: "MentorLagbe | Find Your Perfect Tutor",
    description: defaultDescription,
  },
  twitter: {
    card: "summary",
    title: "MentorLagbe | Find Your Perfect Tutor",
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Providers>
          <Navbar />

          <div className="flex flex-1 flex-col">
            {children}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
