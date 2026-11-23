import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a student or tutor account on MentorLagbe.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
