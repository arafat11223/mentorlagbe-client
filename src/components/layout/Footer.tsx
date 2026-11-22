
import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Find Tuitions", href: "/tuitions" },
    { label: "About Us", href: "/about" },
    { label: "Sign Up", href: "/signup" },
  ],
  account: [
    { label: "Sign In", href: "/signin" },
    { label: "My Profile", href: "/profile" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand information */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <GraduationCap size={24} />
              </span>

              <span className="font-heading text-xl font-extrabold text-foreground">
                Mentor<span className="text-primary">Lagbe</span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              MentorLagbe connects students with qualified tutors.
              Find the right tuition, share your knowledge, and build
              a better learning journey together.
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                support@mentorlagbe.com
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Bangladesh
              </p>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="font-heading text-sm font-bold text-foreground">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="font-heading text-sm font-bold text-foreground">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted">
            © 2026 MentorLagbe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
