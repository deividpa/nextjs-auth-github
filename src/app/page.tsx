"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-green-100 to-green-300 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Roadmap Creator</h1>
        <p className="mb-6 text-lg max-w-xl text-center">
          Generate your personalized roadmap for the day with the help of Gemini AI. Stay organized, set your goals, and track your progress!
        </p>
      </div>
    </div>
  );
}
