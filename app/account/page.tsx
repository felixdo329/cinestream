import { createClient } from "@/lib/supabase/server";
import AuthForm from "../components/AuthForm";
import AccountDashboard from "../components/AccountDashboard";

interface PageProps {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export const metadata = {
  title: "Account – CineStream",
  description: "Sign in or create your CineStream account",
};

export default async function AccountPage({ searchParams }: PageProps) {
  const { error, next = "/account" } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16"
      style={{ background: "var(--background)" }}
    >
      <div className="w-full flex flex-col items-center">
        {error && (
          <p
            className="mb-4 text-sm px-4 py-2 rounded-lg max-w-md text-center"
            style={{ background: "#331a1a", color: "#f87171" }}
          >
            {error}
          </p>
        )}

        {user ? <AccountDashboard user={user} /> : <AuthForm next={next} />}
      </div>
    </div>
  );
}
