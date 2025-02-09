"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition"
    >
      {loading ? "Signing in..." : "Sign In with GitHub"}
    </button>
  );
}
