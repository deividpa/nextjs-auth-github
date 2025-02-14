"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle, FaSpinner } from "react-icons/fa";
import { PiSignInLight } from "react-icons/pi";

export default function LoginPage() {

  const [loadingProvider, setLoadingProvider] = useState<"github" | "google" | null>(null);  
  
  const handleSignIn = async (provider: "github" | "google") => {
    setLoadingProvider(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-[calc(100vh-144px)] items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg shadow-gray-400 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          <span className="inline-flex items-center">
            <PiSignInLight />
            <span className="ml-2">Sign In</span>
          </span>
        </h2>
        <p className="text-gray-600 text-center mt-2">
          <span>Please sign in with your preferred account to continue</span>
        </p>

        <div className="mt-6 flex flex-col space-y-4 shadow-md shadow-slate-500 p-4 rounded">
          <button
            onClick={() => handleSignIn("github")}
            className={`bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition flex items-center justify-center ${
              loadingProvider === "github" ? "cursor-not-allowed opacity-75" : ""
            }`}
            disabled={loadingProvider === "github"}
          >
            {loadingProvider === "github" ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaGithub className="mr-2" />
            )}
            Sign In with GitHub
          </button>

          <button
            onClick={() => handleSignIn("google")}
            className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center justify-center ${
              loadingProvider === "google" ? "cursor-not-allowed opacity-75" : ""
            }`}
            disabled={loadingProvider === "google"}
          >
            {loadingProvider === "google" ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaGoogle className="mr-2" />
            )}
            Sign in with Google
          </button>
          
        </div>
      </div>
    </div>
  );
}