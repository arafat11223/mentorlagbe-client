
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import { Providers } from "./providers";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

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
  title: {
    default: "MentorLagbe | Find Your Perfect Tutor",
    template: "%s | MentorLagbe",
  },
  description:
    "MentorLagbe connects students with qualified tutors. Find the right tuition and build your learning journey.",
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
