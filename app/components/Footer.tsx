import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-16 pt-10 pb-8 px-6 md:px-12"
      style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Logo + tagline */}
        <div className="mb-8">
          <span className="text-xl font-bold" style={{ color: "var(--accent)" }}>
            CINESTREAM
          </span>
          <p className="text-xs mt-1" style={{ color: "#555" }}>
            Your favorite movies, anytime, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-xs font-semibold uppercase mb-4" style={{ color: "#666" }}>
              Browse
            </h4>
            <ul className="flex flex-col gap-2">
              {["Home", "Movies", "TV Series", "Trending", "New Releases"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs hover:text-white transition-colors"
                    style={{ color: "#555" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase mb-4" style={{ color: "#666" }}>
              Genres
            </h4>
            <ul className="flex flex-col gap-2">
              {["Action", "Drama", "Comedy", "Sci-Fi", "Thriller"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs hover:text-white transition-colors"
                    style={{ color: "#555" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase mb-4" style={{ color: "#666" }}>
              Account
            </h4>
            <ul className="flex flex-col gap-2">
              {["Sign In", "Register", "My List", "Settings", "Subscription"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs hover:text-white transition-colors"
                    style={{ color: "#555" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase mb-4" style={{ color: "#666" }}>
              Help
            </h4>
            <ul className="flex flex-col gap-2">
              {["FAQ", "Contact Us", "Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs hover:text-white transition-colors"
                    style={{ color: "#555" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid #1a1a1a" }}
        >
          <p className="text-xs" style={{ color: "#444" }}>
            © {new Date().getFullYear()} CineStream. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social icons */}
            {[
              { label: "Twitter/X", d: "M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-2 .9-3.1 1.1A4.52 4.52 0 0 0 11 8.5c0 .36.04.71.11 1.05A12.81 12.81 0 0 1 3 2.5s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
              { label: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              { label: "Instagram", d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01" },
            ].map(({ label, d }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="hover:text-white transition-colors"
                style={{ color: "#444" }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
