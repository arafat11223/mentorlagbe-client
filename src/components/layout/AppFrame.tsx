"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface AppFrameProps {
  children: React.ReactNode;
}

function AppFrameContent({ children }: AppFrameProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}

      <div className="flex flex-1 flex-col">
        {children}
      </div>

      {!isDashboard && <Footer />}
    </>
  );
}

export function AppFrame({ children }: AppFrameProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      }
    >
      <AppFrameContent>{children}</AppFrameContent>
    </Suspense>
  );
}
