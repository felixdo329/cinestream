"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import type { User } from "@supabase/supabase-js";

interface AccountDashboardProps {
  user: User;
}

export default function AccountDashboard({ user }: AccountDashboardProps) {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "User";
  const initial = displayName[0].toUpperCase();
  const provider = user.app_metadata?.provider ?? "email";
  const joined = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div
      className="w-full max-w-md rounded-2xl p-8"
      style={{ background: "#141414", border: "1px solid #2a2a2a" }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 overflow-hidden"
          style={{ background: "var(--accent)" }}
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#fff" }}>
            {displayName}
          </h1>
          <p className="text-sm truncate max-w-[220px]" style={{ color: "#888" }}>
            {user.email}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between py-3 border-b text-sm" style={{ borderColor: "#2a2a2a" }}>
          <span style={{ color: "#666" }}>Signed in with</span>
          <span style={{ color: "#ccc" }} className="capitalize">
            {provider === "google" ? "Google" : "Email"}
          </span>
        </div>
        <div className="flex justify-between py-3 border-b text-sm" style={{ borderColor: "#2a2a2a" }}>
          <span style={{ color: "#666" }}>Member since</span>
          <span style={{ color: "#ccc" }}>{joined}</span>
        </div>
        <div className="flex justify-between py-3 text-sm">
          <span style={{ color: "#666" }}>Status</span>
          <span style={{ color: "#4ade80" }}>Active</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="w-full py-3 rounded-lg text-sm font-semibold text-center transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Browse Movies
        </Link>
        <Link
          href="/my-list"
          className="w-full py-3 rounded-lg text-sm font-semibold text-center transition-opacity hover:opacity-90"
          style={{ background: "#1e1e1e", color: "#f1f1f1" }}
        >
          My List
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "transparent", color: "#f87171", border: "1px solid #331a1a" }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
