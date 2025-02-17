"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut, FiLoader } from "react-icons/fi";

export const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/"
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`group flex items-center border border-gray-200 text-secondary px-4 py-2 rounded shadow-sm hover:text-primary-hover focus:outline-none transition duration-150 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? (
        <>
          <FiLoader className="mr-2 text-xl animate-spin" />
        </>
      ) : (
        <>
          <FiLogOut className="mr-2 text-xl" />
          <span className="hidden sm:inline">Sign Out</span>
        </>
      )}
    </button>
  );
};