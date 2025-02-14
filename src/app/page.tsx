"use server";

import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="p-8 rounded-lg shadow-lg text-center space-y-6 bg-black/10">
        <h1 className="text-4xl font-bold mb-2">Welcome to Roadmap Creator</h1>

        <Image
          src="/images/roadmap.jpg"
          alt="Roadmap example"
          width={400}
          height={250}
          className="rounded-lg shadow-2xl mx-auto my-4"
        />

        <p className="mb-6 text-lg max-w-2xl text-center">
          Generate your personalized roadmap for the day with the help of Gemini AI. Stay organized, set your goals, and track your progress!
        </p>
      </div>
    </div>
  );
}
