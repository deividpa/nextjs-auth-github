"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignOutButton } from "../auth/sign-out-button";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          <div className="flex items-center space-x-6">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600 cursor-pointer">
                Roadmap Creator
              </span>
            </Link>

            <Link href="/roadmap">
              <span className="text-gray-700 hover:text-blue-600 transition cursor-pointer">
                Public Roadmaps
              </span>
            </Link>

            {session && (
              <Link href="/dashboard">
                <span className="text-gray-700 hover:text-blue-600 transition">
                  Dashboard
                </span>
              </Link>
            )}
            
          </div>

          <div className="flex items-center space-x-4">
            {status === "loading" ? null : session ? (
              <SignOutButton />
            ) : (
              <Link href="/auth/login">
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryHover transition">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
