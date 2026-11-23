"use client";

import { useSyncExternalStore, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "../../lib/auth-client";
import { apiRequest } from "../../lib/api/client";

type UserRole = "student" | "tutor";

interface BusinessUser {
  role: UserRole;
}

interface CheckoutSession {
  sessionId: string;
  url: string;
}

interface PricingCheckoutButtonProps {
  role: UserRole;
  highlighted?: boolean;
  label: string;
}

export function PricingCheckoutButton({
  role,
  highlighted = false,
  label,
}: PricingCheckoutButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (isPending || loading) return;

    if (!session?.user) {
      router.push("/signin");
      return;
    }

    setLoading(true);

    try {
      const profileResponse =
        await apiRequest<BusinessUser>("/api/users/me");

      if (profileResponse.data?.role !== role) {
        toast.error(
          `This membership is available for ${role} accounts only.`
        );
        return;
      }

      const response = await apiRequest<CheckoutSession>(
        "/api/payments/checkout-session",
        { method: "POST" }
      );

      const checkoutUrl = response.data?.url;

      if (!checkoutUrl) {
        throw new Error("Stripe Checkout URL was not returned.");
      }

      window.location.assign(checkoutUrl);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading || isPending}
      className={`mt-9 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
        highlighted
          ? "bg-primary text-primary-foreground hover:opacity-90"
          : "border border-border text-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {loading ? (
        <>
          <LoaderCircle size={17} className="animate-spin" />
          Connecting to checkout...
        </>
      ) : (
        <>
          {label}
          {highlighted && <ArrowRight size={17} />}
        </>
      )}
    </button>
  );
}

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback);

  return () => {
    window.removeEventListener("popstate", callback);
  };
}

function getCancellationStatus() {
  return new URLSearchParams(window.location.search).get("payment") === "cancelled";
}

function getServerCancellationStatus() {
  return false;
}

export function PaymentStatusNotice() {
  const cancelled = useSyncExternalStore(
    subscribeToLocation,
    getCancellationStatus,
    getServerCancellationStatus
  );

  if (!cancelled) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <div
        role="status"
        className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm leading-6 text-foreground"
      >
        Checkout was cancelled. No payment was completed.
        You can choose a membership whenever you are ready.
      </div>
    </div>
  );
}