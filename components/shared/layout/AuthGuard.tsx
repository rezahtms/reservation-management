"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth.store";

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.hydrated);

  React.useEffect(() => {
    if (isHydrated && !currentUser) {
      router.replace("/");
    }
  }, [isHydrated, currentUser, router]);

  if (!isHydrated || !currentUser) return null;

  return <>{children}</>;
}

export { AuthGuard };
export default AuthGuard;
