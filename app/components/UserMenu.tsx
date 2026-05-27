"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

export default function UserMenu() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full animate-pulse" style={{ background: "#2a2a2a" }} />
    );
  }

  if (!user) {
    return (
      <Link
        href="/account"
        className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: "var(--accent)", color: "#fff" }}
      >
        Sign In
      </Link>
    );
  }

  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "User";
  const initial = displayName[0].toUpperCase();
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold overflow-hidden"
        style={{ background: "var(--accent)" }}
        aria-label="Account menu"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" className="w-full h-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-10 z-50 w-52 rounded-lg py-2"
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
          >
            <p className="px-4 py-2 text-xs font-medium truncate" style={{ color: "#fff" }}>
              {displayName}
            </p>
            <p className="px-4 pb-2 text-xs truncate" style={{ color: "#666" }}>
              {user.email}
            </p>
            <div className="h-px my-1" style={{ background: "#2a2a2a" }} />
            <Link
              href="/account"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              style={{ color: "#ccc" }}
              onClick={() => setOpen(false)}
            >
              My Account
            </Link>
            <Link
              href="/my-list"
              className="block px-4 py-2 text-sm hover:bg-white/5"
              style={{ color: "#ccc" }}
              onClick={() => setOpen(false)}
            >
              My List
            </Link>
            <div className="h-px my-1" style={{ background: "#2a2a2a" }} />
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm hover:bg-white/5"
              style={{ color: "#f87171" }}
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
