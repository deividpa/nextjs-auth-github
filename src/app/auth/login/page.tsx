"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (provider: "github" | "google") => {
    setLoading(true);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Sign In</h2>
        <p className="text-gray-600 text-center mt-2">
          Please sign in with your preferred account to continue
        </p>

        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={() => handleSignIn("github")}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In with GitHub"}
          </button>

          <button
            onClick={() => handleSignIn("google")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in with Google"}
          </button>
          
        </div>
      </div>
    </div>
  );
}