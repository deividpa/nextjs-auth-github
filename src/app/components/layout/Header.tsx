"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignOutButton } from "../auth/sign-out-button";
import { RiDashboardLine, RiRoadMapLine } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b-2 border-accent shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Nav Section */}
          <div className="flex items-center space-x-6">
            <Link href="/">
              <span className="text-2xl font-bold text-primary cursor-pointer">
                Roadmap Creator
              </span>
            </Link>

            {session && (
              <Link href="/dashboard">
                <span className="flex items-center text-secondary hover:text-primary-hover transition cursor-pointer">
                  <RiDashboardLine className="mr-1 text-xl" />
                  Dashboard
                </span>
              </Link>
            )}

            <Link href="/roadmap">
              <span className="flex items-center text-secondary hover:text-primary-hover transition cursor-pointer">
                <RiRoadMapLine className="mr-1 text-xl" />
                Public Roadmaps
              </span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? null : session ? (
              <SignOutButton />
            ) : (
              <Link href="/auth/login">
                <button className="flex items-center bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
                  <FiLogIn className="mr-2 text-lg" />
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