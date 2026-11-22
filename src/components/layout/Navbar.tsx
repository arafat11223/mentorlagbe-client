"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Menu,
  X,
  UserRound,
  LogOut,
} from "lucide-react";

import { authClient } from "../../lib/auth-client";
import { apiRequest } from "../../lib/api/client";
import { Button } from "../ui/Button";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Find Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

type UserRole = "student" | "tutor" | "admin";

interface BusinessUserProfile {
  role: UserRole;
}

interface RoleBadgeProps {
  role: UserRole | null;
  loading: boolean;
}

function RoleBadge({ role, loading }: RoleBadgeProps) {
  if (loading) {
    return (
      <span className="h-6 w-16 animate-pulse rounded-full bg-surface-secondary" />
    );
  }

  if (!role) {
    return null;
  }

  const roleStyles: Record<UserRole, string> = {
    student: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    tutor: "bg-primary/10 text-primary",
    admin: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${roleStyles[role]}`}
    >
      {role}
    </span>
  );
}

export function Navbar() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [businessRole, setBusinessRole] = useState<UserRole | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    let cancelled = false;

    async function loadBusinessProfile() {
      if (!session?.user) {
        setBusinessRole(null);
        setRoleLoading(false);
        return;
      }

      setRoleLoading(true);

      try {
        const response =
          await apiRequest<BusinessUserProfile>("/api/users/me");

        if (!cancelled) {
          setBusinessRole(response.data?.role ?? null);
        }
      } catch {
        if (!cancelled) {
          setBusinessRole(null);
        }
      } finally {
        if (!cancelled) {
          setRoleLoading(false);
        }
      }
    }

    loadBusinessProfile();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Sign out failed:", result.error.message);
        return;
      }

      setBusinessRole(null);
      closeMobileMenu();
      router.replace("/signin");
      router.refresh();
    } catch (error) {
      console.error("Unable to sign out:", error);
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <GraduationCap size={24} />
          </span>

          <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
            Mentor<span className="text-primary">Lagbe</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-28 animate-pulse rounded-lg bg-surface-secondary" />
          ) : session?.user ? (
            <>
              <div className="flex items-center gap-2">
                <UserRound size={18} className="text-muted" />

                <span className="max-w-32 truncate text-sm font-semibold text-foreground">
                  {session.user.name || "My Account"}
                </span>

                <RoleBadge role={businessRole} loading={roleLoading} />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={signingOut}
              >
                <LogOut size={16} />
                {signingOut ? "Signing out..." : "Sign out"}
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-semibold text-foreground transition hover:text-primary"
              >
                Sign in
              </Link>

              <Button
                size="sm"
                onClick={() => router.push("/signup")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition hover:bg-surface-secondary md:hidden"
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-surface px-4 py-5 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-secondary hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border pt-4">
              {isPending ? (
                <p className="text-sm text-muted">Loading account...</p>
              ) : session?.user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2 px-3 py-2">
                    <UserRound size={18} className="text-muted" />

                    <span className="text-sm font-semibold text-foreground">
                      {session.user.name || "My Account"}
                    </span>

                    <RoleBadge role={businessRole} loading={roleLoading} />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={signingOut}
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} />
                    {signingOut ? "Signing out..." : "Sign out"}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/signin"
                    onClick={closeMobileMenu}
                    className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-semibold text-foreground"
                  >
                    Sign in
                  </Link>

                  <Button
                    className="w-full"
                    onClick={() => {
                      closeMobileMenu();
                      router.push("/signup");
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
