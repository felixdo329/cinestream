"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(13,13,13,0.97)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
        borderBottom: scrolled ? "1px solid #1e1e1e" : "none",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            CINESTREAM
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-white transition-colors" style={{ color: "#ccc" }}>
            Home
          </Link>
          <Link href="/movies" className="hover:text-white transition-colors" style={{ color: "#ccc" }}>
            Movies
          </Link>
          <Link href="/series" className="hover:text-white transition-colors" style={{ color: "#ccc" }}>
            TV Series
          </Link>
          <Link href="/trending" className="hover:text-white transition-colors" style={{ color: "#ccc" }}>
            Trending
          </Link>
          <Link href="/my-list" className="hover:text-white transition-colors" style={{ color: "#ccc" }}>
            My List
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 rounded text-sm outline-none w-44 md:w-60"
                  style={{
                    background: "#1e1e1e",
                    color: "#f1f1f1",
                    border: "1px solid #333",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-white text-lg leading-none"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Search"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            )}
          </div>

          {/* Notifications */}
          <button
            className="hidden md:block text-gray-300 hover:text-white transition-colors p-1"
            aria-label="Notifications"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <UserMenu />

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t py-4 px-6 flex flex-col gap-4 text-sm"
          style={{
            background: "rgba(13,13,13,0.98)",
            borderColor: "#1e1e1e",
          }}
        >
          {[
            { label: "Home", href: "/" },
            { label: "Movies", href: "/movies" },
            { label: "TV Series", href: "/series" },
            { label: "Trending", href: "/trending" },
            { label: "My List", href: "/my-list" },
            { label: "Account", href: "/account" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
