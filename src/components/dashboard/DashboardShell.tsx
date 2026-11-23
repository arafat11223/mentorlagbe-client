"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Menu,
  X,
  LogOut,
  ArrowUpRight,
  ShieldCheck,
  UserRound,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "../../lib/auth-client";
import { apiRequest } from "../../lib/api/client";
import { Button } from "../ui/Button";

type UserRole = "student" | "tutor" | "admin";

interface BusinessUserProfile {
  id?: string;
  name?: string;
  email?: string;
  image?: string | null;
  role: UserRole;
  plan?: "free" | "pro";
}

interface DashboardShellProps {
  children: React.ReactNode;
}

const roleInformation: Record<
  UserRole,
  { title: string; description: string }
> = {
  student: {
    title: "Student Dashboard",
    description: "Manage your learning journey.",
  },
  tutor: {
    title: "Tutor Dashboard",
    description: "Manage your tutoring activities.",
  },
  admin: {
    title: "Admin Dashboard",
    description: "Monitor and manage the platform.",
  },
};

function getDashboardPath(role: UserRole) {
  return `/dashboard/${role}`;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [profile, setProfile] = useState<BusinessUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }

    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const response =
          await apiRequest<BusinessUserProfile>("/api/users/me");

        if (cancelled) return;

        const businessUser = response.data;

        if (
          !businessUser ||
          !["student", "tutor", "admin"].includes(businessUser.role)
        ) {
          setError("Your account role could not be verified.");
          setLoading(false);
          return;
        }

        setProfile(businessUser);

        const correctPath = getDashboardPath(businessUser.role);

        if (pathname === "/dashboard") {
          router.replace(correctPath);
          return;
        }

        if (
          pathname.startsWith("/dashboard/") &&
          !pathname.startsWith(correctPath)
        ) {
          router.replace(correctPath);
          return;
        }

        setLoading(false);
      } catch (err) {
        if (cancelled) return;

        const message =
          err instanceof Error
            ? err.message
            : "Unable to load your account.";

        if (
          typeof err === "object" &&
          err !== null &&
          "statusCode" in err &&
          err.statusCode === 401
        ) {
          router.replace("/sign-in");
          return;
        }

        setError(message);
        setLoading(false);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id, isPending, pathname, router]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Unable to sign out.");
        return;
      }

      toast.success("Signed out successfully.");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("Unable to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending || loading || !session?.user || !profile) {
    if (error) {
      return (
        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-card)]">
            <AlertCircle className="mx-auto text-danger" size={36} />

            <h1 className="mt-4 text-xl font-bold text-foreground">
              Unable to load dashboard
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted">
              {error}
            </p>

            <Button
              className="mt-6"
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>
          </div>
        </main>
      );
    }

    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm font-medium text-muted">
            Verifying your account...
          </p>
        </div>
      </main>
    );
  }

  const role = profile.role;
  const information = roleInformation[role];

  const navigation = [
    {
      label: "Overview",
      href: getDashboardPath(role),
      icon: LayoutDashboard,
    },
    {
      label: "Find Tuitions",
      href: "/tuitions",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close dashboard menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-border bg-surface
          transition-transform duration-200
          lg:translate-x-0
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-border px-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <GraduationCap size={23} />
            </span>

            <span className="text-xl font-extrabold tracking-tight text-foreground">
              Mentor<span className="text-primary">Lagbe</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-muted hover:bg-surface-secondary lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-border px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              {role === "admin" ? (
                <ShieldCheck size={21} />
              ) : (
                <UserRound size={21} />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">
                {profile.name || session.user.name || "My Account"}
              </p>

              <span className="mt-1 inline-flex rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                {role}
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 pt-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Workspace
          </p>

          <nav aria-label="Dashboard navigation" className="mt-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-semibold transition
                    ${
                      active
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted hover:bg-surface-secondary hover:text-foreground"
                    }
                  `}
                >
                  <Icon size={19} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted transition hover:bg-surface-secondary hover:text-foreground"
          >
            <ArrowUpRight size={18} />
            Back to website
          </Link>

          <button
            type="button"
            disabled={signingOut}
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-danger transition hover:bg-danger/10 disabled:opacity-50"
          >
            <LogOut size={18} />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur-md sm:px-6 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open dashboard menu"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg border border-border p-2 text-foreground hover:bg-surface-secondary lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-base font-extrabold text-foreground sm:text-lg">
                {information.title}
              </h1>

              <p className="hidden text-xs text-muted sm:block">
                {information.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-muted sm:block">
              {profile.name || session.user.name || "Welcome"}
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
              <UserRound size={19} />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-9">
          {children}
        </main>
      </div>
    </div>
  );
}
