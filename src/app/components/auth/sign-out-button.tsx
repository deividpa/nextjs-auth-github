"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";

export const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none transition duration-150 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? "Signing Out..." : "Sign Out"}
    </button>
  );
};
