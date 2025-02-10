"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";


export function SignInWithGoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 transition"
    >
      {loading ? "Signing in..." : "Sign In with Google"}
    </button>
  );
}